import sqlite3
from sqlite3 import Error
from sqlite3.dbapi2 import connect
import pandas as pd

def create_connection(db_path):
    conn = None
    try: 
        conn = sqlite3.connect(db_path)
    except Error as err:
        print(err)
    return conn

def select_all(db_path, table_name):
    conn = create_connection(db_path)
    c = conn.cursor()
    
    rows = c.execute("SELECT * FROM {};".format(table_name))

    data = []
    for row in rows.fetchall():
        data.append(row)
    conn.commit()
    conn.close()

    return data

def select_with_key(db_path, table_name, key_name, key_value):
    conn = create_connection(db_path)
    c = conn.cursor()
    key_value = key_value.lower()
    
    rows = c.execute("SELECT * FROM {} WHERE {} = {} ;".format(table_name, key_name, key_value))
    
    data = []
    for row in rows.fetchall():
        data.append(row)
    conn.commit()
    conn.close()

    return data

def csv_to_db(db_path, data_path):
    conn = create_connection(db_path)
    c = conn.cursor()

    df = pd.read_csv(data_path)

    num_rows = df.shape[0]

    for i in range(num_rows):
        user_name = df.iloc[i]['name']
        user_tel = df.iloc[i]['tel']
        user_addr = df.iloc[i]['addr']
        user_email = df.iloc[i]['email'].lower()
        user_status = df.iloc[i]['status']
        data = (user_name, user_tel, user_addr, user_email, user_status)

        try:
            c.execute("INSERT INTO USERS VALUES {};".format(str(data)))
        except Error as err:
            print(err, data)

    # Commit and close
    conn.commit()
    conn.close()    
