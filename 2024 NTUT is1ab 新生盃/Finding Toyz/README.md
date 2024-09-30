#  Finding Toyz

## Introduction
Embark on a easy virtual journey through a Taichung prison maze inspired by recent events involving Toyz, a prominent esports figure sentenced to over four years for cannabis trafficking in Taiwan. Navigate the challenges of this CTF web challenge and locate Toyz within the intricate confines of the prison.\
Proceed to "Find Toyz" now to obtain the flag.

## Installation
To deploy Finding Toyz using Docker Build, follow these steps:
### Clone the repository:
```
git clone https://github.com/Chw41/Individual-CTF-Topic.git
cd Finding\ Toyz/
```  
### Using docker build to deploy the application
```
docker build -t findingtoyz .
docker run -d -p 80:80 findingtoyz
```

