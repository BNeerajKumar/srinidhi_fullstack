from rest_framework.routers import DefaultRouter
from .views import KhataViewSet

router = DefaultRouter()
router.register(r"", KhataViewSet, basename="khata")

urlpatterns = router.urls