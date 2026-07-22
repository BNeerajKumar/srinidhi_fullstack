from rest_framework import serializers


class DashboardReportSerializer(serializers.Serializer):

    total_customers = serializers.IntegerField()

    total_products = serializers.IntegerField()

    total_bills = serializers.IntegerField()

    total_sales = serializers.DecimalField(
        max_digits=12,
        decimal_places=2
    )

    total_credit = serializers.DecimalField(
        max_digits=12,
        decimal_places=2
    )

    low_stock_products = serializers.IntegerField()