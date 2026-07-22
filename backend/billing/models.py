from django.db import models
from customers.models import Customer
from inventory.models import Product


class Bill(models.Model):

    PAYMENT_CHOICES = [
        ("Cash", "Cash"),
        ("UPI", "UPI"),
        ("Credit", "Credit"),
    ]
    customer = models.ForeignKey(
    Customer,
    on_delete=models.CASCADE
    )
    payment_type = models.CharField(
        max_length=20,
        choices=PAYMENT_CHOICES,
        default="Cash"
    )

    total_amount = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"Bill {self.id}"


class BillItem(models.Model):

    bill = models.ForeignKey(
        Bill,
        related_name="items",
        on_delete=models.CASCADE
    )

    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE
    )

    quantity = models.PositiveIntegerField()

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    subtotal = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    def __str__(self):
        return self.product.name