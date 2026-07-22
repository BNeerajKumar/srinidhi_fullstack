from decimal import Decimal

from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Khata
from .serializers import KhataSerializer


class KhataViewSet(viewsets.ModelViewSet):

    queryset = Khata.objects.all().order_by("-created_at")
    serializer_class = KhataSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=True, methods=["post"])
    def collect_payment(self, request, pk=None):

        khata = self.get_object()

        amount = Decimal(str(request.data.get("amount", 0)))

        if amount <= 0:
            return Response(
                {"error": "Invalid Amount"},
                status=400
            )

        if amount > khata.balance:
            return Response(
                {"error": "Amount exceeds balance"},
                status=400
            )

        khata.paid_amount += amount
        khata.balance -= amount

        khata.save()

        serializer = self.get_serializer(khata)

        return Response(serializer.data)