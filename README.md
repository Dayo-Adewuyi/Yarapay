# YARAPAY

Yarapay is a simple, easy to use, and secure application for managing your digital assets. It allows you send and receive payments, pay bills and manage your assets in a secure way.

## Features

- Send and receive payments to any one in the world
- Pay bills
- Manage your assets
- Import your assets from other wallets
- Secure your wallet with a password


### Requirements

- Node.js
- skaffold
- kubectl
- minikube (optional)
- Docker (optional)

### Installation

- Clone the repository

```bash
git clone https://github.com/YaraPay/MVP.git
```

- Install skaffold

```bash
brew install skaffold
```
**Note:** If you are using Linux or Windows, you can install skaffold from [here](https://skaffold.dev/docs/install/)

- Install Ingress

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.41.2/deploy/static/provider/cloud/deploy.yaml
```

_**Note:** If you are using minikube, you can use the following command to enable the Ingress addon_

```bash
minikube addons enable ingress
```

### Usage

- Start the application in dev mode

```bash
skaffold dev
```
- Rename your hosts file

open the hosts file in your editor and add the following line to the end of the file

```bash
127.0.0.1 yarapay.xyz
```

#### Linux

```bash
sudo vim /etc/hosts
```
#### Mac

```bash
sudo vim /private/etc/hosts
```
#### Windows

```bash
C:\Windows\System32\drivers\etc\hosts
```


Now you can access the application from your browser using the following URL

```bash
http://yarapay.xyz
```
BON APPETIT!

### Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

### License

[MIT](https://choosealicense.com/licenses/mit/)

### Authors

- [Dayo](https://github.com/dayo-adewuyi) and 
[Frank](https://github.com/frankudoags)


