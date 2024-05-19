import socket

def send_data(s, data):
    # 將整數轉換為字串並傳送到伺服器
    s.sendall(str(data).encode())
    
    # 接收伺服器的回應
    response = s.recv(1024)
    
    # 顯示伺服器的回應
    print(response.decode())

if __name__ == "__main__":
    host = "83.136.252.62"
    port = 49263
    
    # 連接到指定的主機和埠
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.connect((host, port))
        
        # 分次輸入整數1到103
        for i in range(1, 104):
            send_data(s, i)
