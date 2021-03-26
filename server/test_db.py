from dblib import select_all

data = select_all('users.db', 'USERS')

for row in data:
    print(row)