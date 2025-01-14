import datetime
import random
from logging import getLogger

from appappointment.models import Appointment
from appappointment.serializers.appointment import AppointmentGetOut, AppointmentPostIn
from django.db import IntegrityError
from ninja import Form, Router

from app.errors import HttpError, make_error

router = Router(tags=["appointments"])

logger = getLogger(__name__)


@router.post(
    "/",
    response={201: AppointmentGetOut, 400: HttpError, 500: HttpError},
)
def create_appointment(
    request,
    payload: AppointmentPostIn,
):
    chance_of_failure = random.randint(0, 100)

    if chance_of_failure > 50:
        if chance_of_failure > 60:
            return make_error(500, "Server error", data={"error": "Random error"})
        elif chance_of_failure > 70:
            return make_error(400, "Invalid payload")
        elif chance_of_failure > 80:
            return make_error(401, "Unauthorized")
        else:
            return make_error(403, "Forbidden")

    try:
        payload.date.replace(second=0, minute=0, tzinfo=None)

        result = Appointment.objects.create(
            **payload.dict(), created_at=datetime.datetime.now()
        )

        return 201, result
    except IntegrityError as e:
        logger.error(f"create_appointment integrity error: {e}")
        return 400, HttpError(status_code=400, message="Invalid payload")
    except Exception as e:
        logger.error(f"create_appointment error: {e}")
        return 500, HttpError(
            status_code=500, message="Server error", data={"error": e}
        )


@router.get(
    "/",
    response={200: list[AppointmentGetOut]},
)
def get_appointments(request, date: datetime.date | None = None):
    if not date:
        date = datetime.datetime.now()

    appointments = Appointment.objects.filter(
        date__year=date.year, date__month=date.month
    )

    return 200, appointments
