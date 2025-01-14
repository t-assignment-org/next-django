from appappointment.routes.appointment import router as appointment_router
from ninja import Router

router = Router()
router.add_router("/", appointment_router)
