from rest_framework import serializers
from .models import Bill, BillItem
from khata.models import Khata


class BillItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = BillItem
        fields = [
            "product",
            "quantity",
            "price",
        ]


class BillSerializer(serializers.ModelSerializer):
    items = BillItemSerializer(many=True)

    class Meta:
        model = Bill
        fields = [
            "id",
            "customer",
            "payment_type",
            "total_amount",
            "created_at",
            "items",
        ]
        read_only_fields = ["id", "created_at"]

    def create(self, validated_data):

        items_data = validated_data.pop("items")

        bill = Bill.objects.create(**validated_data)

        for item_data in items_data:

            product = item_data["product"]
            quantity = item_data["quantity"]
            price = item_data["price"]

            BillItem.objects.create(
                bill=bill,
                product=product,
                quantity=quantity,
                price=price,
                subtotal=price * quantity,
            )

            product.quantity -= quantity
            product.save()

        # Create Khata only for Credit Bills
        if bill.payment_type.lower() == "credit":
            Khata.objects.create(
                customer=bill.customer,
                total_amount=bill.total_amount,
                paid_amount=0,
                balance=bill.total_amount,
            )

        return bill