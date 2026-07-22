from rest_framework import viewsets
from .models import Bill
from .serializers import BillSerializer
from rest_framework.permissions import IsAuthenticated


class BillViewSet(viewsets.ModelViewSet):

    queryset = Bill.objects.all().order_by("-id")

    serializer_class = BillSerializer
    permission_classes = [IsAuthenticated]