from django.shortcuts import render

# A entry point for the react app
def index(request):
    return render(request, "build/index.html")

