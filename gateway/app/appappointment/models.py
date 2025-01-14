import uuid

from django.db import models


class Appointment(models.Model):
    id = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    date = models.DateTimeField(null=False, blank=False, unique=True)
    email = models.EmailField(null=False, blank=False)
    description = models.TextField(null=False, blank=False, max_length=400)
    created_at = models.DateTimeField(null=False, blank=False)
