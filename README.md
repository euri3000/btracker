# btracker
To track baby's last feeding time and nap time for BUSY MOM & DAD!

# Setup 

## Install serverless
 `npm install serverless -g`

## Sign up (login) mongoDb cloud
 ```https://www.mongodb.com/cloud```

## Get AWS lambda IAM user key/secret pair and set 
 `serverless config credentials --provider aws --key xxxxxxxxxxxxxx --secret xxxxxxxxxxxxxx`

## install node modules
 ```cd ~/dev/btracker ; npm install```

## Update configuration with your mongourl and dashbutton mac

## Deploy lambda functions using serverless
 ```serverelss deploy -v```
 * check deployed service information and check endpoints work

## Update config with your need lambda endpoint and deploy one more time. 
```serverless deploy -f trackNap ;  serverless deploy -f trackFeeding```

# Run
### Run dash file
 ```cd ~/dev/btrack ; sudo node dash.js```

### Press your dash button ! 