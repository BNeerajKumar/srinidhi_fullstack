from rest_framework import serializers
from .models import Khata


class KhataSerializer(serializers.ModelSerializer):

    customer_name = serializers.CharField(
        source="customer.name",
        read_only=True
    )

    class Meta:
        model = Khata
        fields = "__all__"