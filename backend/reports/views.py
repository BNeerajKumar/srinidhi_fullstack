from django.db.models import Sum
from django.utils import timezone

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from customers.models import Customer
from inventory.models import Product
from billing.models import Bill
from khata.models import Khata


class DashboardReportView(APIView):

    def get(self, request):

        total_customers = Customer.objects.count()

        total_products = Product.objects.count()

        total_bills = Bill.objects.count()

        total_sales = (
            Bill.objects.aggregate(
                total=Sum("total_amount")
            )["total"] or 0
        )

        total_credit = (
            Khata.objects.aggregate(
                total=Sum("balance")
            )["total"] or 0
        )

        today = timezone.now().date()

        today_sales = (
            Bill.objects.filter(created_at__date=today)
            .aggregate(total=Sum("total_amount"))["total"] or 0
        )

        low_stock = Product.objects.filter(
            quantity__lte=5
        ).values(
            "name",
            "quantity"
        )

        recent_bills = Bill.objects.order_by("-id")[:5]

        recent_bill_list = []

        for bill in recent_bills:
            recent_bill_list.append({
                "id": bill.id,
                "customer": bill.customer.name,
                "amount": bill.total_amount,
                "payment": bill.payment_type,
            })

        return Response({

            "total_customers": total_customers,

            "total_products": total_products,

            "total_bills": total_bills,

            "total_sales": total_sales,

            "today_sales": today_sales,

            "total_credit": total_credit,

            "low_stock_products": list(low_stock),

            "recent_bills": recent_bill_list

        })