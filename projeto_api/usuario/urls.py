from django.urls import path
from . import views

urlpatterns = [
    path('modalidade/', views.ModalidadeList.as_view(), name='modalidade-list'),
    path('modalidade/<int:pk>/', views.ModalidadeDetail.as_view(),name='modalidade-detail'),
    path('usuario/', views.UsuarioList.as_view(), name='usuario-list'),
    path('usuario/<int:pk>/', views.UsuarioDetail.as_view(), name='usuario-detail'),

]