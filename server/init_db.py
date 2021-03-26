from dblib import create_connection, csv_to_db

conn = create_connection("users.db")

conn.execute("CREATE TABLE USERS(user_name text, user_tel text, user_addr text, user_email text primary key, user_status text);")

# Commit and close
conn.commit()
conn.close()

# Add data to database
csv_to_db("users.db", "Data/renamed_data.csv")

