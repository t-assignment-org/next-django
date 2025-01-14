import datetime

from appappointment.models import Appointment
from ninja import Field, ModelSchema
from pydantic import EmailStr


class AppointmentSchema(ModelSchema):
    class Meta:
        model = Appointment
        exclude = ["id"]


class AppointmentGetOut(AppointmentSchema):
    date: datetime.datetime
    email: EmailStr
    description: str
    created_at: datetime.datetime


class AppointmentPostIn(ModelSchema):
    # NOTE: Maybe better to stick with 'yyyy-mm-dd hh:mm' format and convert to date?
    date: datetime.datetime
    email: EmailStr
    description: str = Field(None, max_length=400)

    class Meta:
        model = Appointment
        exclude = ["id", "created_at"]
