from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import User, Expense, Group

@api_view(['POST'])
def create_user_profile(request):
    print("HERE")
    print(request.data)
    user_name = request.data['user_name']
    email = request.data['email']
    password = request.data['password']
    
    print(user_name,email,password)
    try:
        user = User(user_name = user_name,email = email,password = password)
        user.save()
        print("here")
        return Response({ "id" : user.id, "name" : user.user_name, "amount" :user.amount,"email":user.email})
    except Exception as e:
        print(e)
        return Response({"error":"Bad data"})

@api_view(['POST'])    
def get_user(request):
    id = request.data['user_id']
    try:
        user = User.objects.filter(id = id)
        return Response({ "id" : user.id, "name" : user.user_name, "amount" :user.amount,"email":user.email})
    except Exception as e: 
        print(e)
        return Response({"error" : "Bad data requested"})
    
@api_view(['POST'])
def createGroup(request):
    pass
    
    


# @api_view(['POST'])
# def create_expense(request):
#     des = request.data['desc']
#     amount = request.data['amount']
#     payer_name = request.data['payer']
#     participants = request.data['participants']

# @api_view(['POST'])
# def simplify(request):
#     user_id = request.data['user_id']
#     group_id = request.data['group_id']
    
   

@api_view(['POST'])
def create_group(request):
    if request.method == 'POST':
        serializer = GroupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)