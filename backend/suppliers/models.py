from django.db import models


class Supplier(models.Model):

    name = models.CharField(max_length=100)

    phone = models.CharField(max_length=15)

    company = models.CharField(max_length=100)

    email = models.EmailField(blank=True, null=True)

    address = models.TextField(blank=True)

    gst_number = models.CharField(
        max_length=50,
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.name