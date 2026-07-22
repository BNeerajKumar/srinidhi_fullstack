from django.urls import path

from .views import DashboardReportView

urlpatterns = [

    path(
        "",
        DashboardReportView.as_view(),
        name="dashboard-report"
    ),

]