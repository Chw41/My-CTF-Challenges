
#import base64

#decoded_string = b'd3BqdkpBTXtqaGx6aHlfazNqeTl3YTNrXzc4MjUwaG1qfQ=='
#decoded_string_as_str = decoded_string.decode('utf-8')
#print(decoded_string_as_str)

import base64

# 要解码的Base64编码的字节串
encoded_bytes = b'd3BqdkpBTXtqaGx6aHlfazNqeTl3YTNrXzc4MjUwaG1qfQ=='

# 使用base64解码
decoded_bytes = base64.b64decode(encoded_bytes)

# 将解码后的字节串转换为字符串
decoded_string = decoded_bytes.decode('utf-8')

print(decoded_string)
