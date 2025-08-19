from django.db import models

class Modalidade(models.Model):
    nome = models.CharField(max_length=100)

    def __str__(self):
        return self.nome
    
class Usuario(models.Model):
    nome = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    turma = models.CharField(max_length=100)
    curso = models.CharField(max_length=100)
    Modalidade = models.ForeignKey(Modalidade, related_name='usuario',on_delete=models.CASCADE)

    def __str__(self):
        return self.nome