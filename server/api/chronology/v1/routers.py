from rest_framework import routers

from .views import RegionView, ChronologyView, TimelineViewSet, EventView, UserRegionView

app_name = "chronology"

router = routers.SimpleRouter()

router.register("geo", RegionView)
router.register("chronology", ChronologyView)
router.register("region", UserRegionView)
router.register(
    r"timeline/(?P<chronology_id>\d+)", TimelineViewSet, basename="timeline"
)
router.register(r"events/(?P<chronology_id>\d+)", EventView, basename="events")

urlpatterns = router.urls
