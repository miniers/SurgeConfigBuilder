 /*
    surge conf builder
    
    作者：https://t.me/miniers

   */
  const _ = require('lodash');
  $app.autoKeyboardEnabled = true;
  $app.keyboardToolbarEnabled = true;
  let baseUrl = "https://raw.githubusercontent.com/lhie1/Surge/master/Auto/",
    surgeList = [
      'Apple',
      'DIRECT',
      'HEADER REWRITE',
      'HOST',
      'Hostname',
      'PROXY',
      'REJECT',
      'URL REJECT',
      'URL REWRITE',
    ];
  const fields = [{ 
      name: 'filename',
      text: '生成的配置文件名(必填)'
    },
    {
      name: 'General',
      text: '(必填)'
    },
    {
      name: 'Proxy',
      text: '(必填)'
    },
    {
      name: 'Custom',
    },
    {
      name: "ipRule"
    },
    {
      name: 'Delete',
      text: '删除所有包含该字符的规则，按行分隔'
    },
    {
      name: 'Rewrite',
    },
    'Host',
    'SSID',
    {
      name: 'extProxy',
      text: '扩展代理，不会增加到自动生成的代理组'
    },
    {
      name: 'hostname',
      text: 'MITM中的hostname'
    },
    {
      name: 'extProxyGroup',
      text: '自定义代理组'
    },
    'MITM',
  ];
  
  let config;
  if ($drive.exists("surge.conf")) {
    try {
      let file = $drive.read("surge.conf");
      config = JSON.parse($drive.read("surge.conf").string)
    } catch (err) {
      initConfig()
    }
  } else {
    initConfig()
  }
  //初始化配置
  function initConfig() {
  
    config = {
      filename: 'surge.conf',
      remoteSwitch:{},
      'General': `// Auto
  loglevel = notify
  dns-server = system
  skip-proxy = 127.0.0.1,192.168.0.0/16,10.0.0.0/8,172.16.0.0/12,100.64.0.0/10,17.0.0.0/8,localhost,*.local,e.crashlytics.com,captive.apple.com,::ffff:0:0:0:0/1,::ffff:128:0:0:0/1
   
  // iOS
  bypass-system = true
  external-controller-access = lhie1@0.0.0.0:6170
  
  // macOS
  interface = 0.0.0.0
  socks-interface = 0.0.0.0
  port = 8888
  socks-port = 8889
  
  // Off：On | "true" or "false"
  allow-wifi-access = true
  collapse-policy-group-items = true
  enhanced-mode-by-rule = false
  exclude-simple-hostnames = true
  hide-crashlytics-request = true
  ipv6 = true
  replica = false`,
      'Proxy': `🇺🇸 US = custom,us.com,1234,rc4-md5,password,http://omgib13x8.bkt.clouddn.com/SSEncrypt.module
  
  🇭🇰 HK = custom,hk.com,1234,rc4-md5,password,http://omgib13x8.bkt.clouddn.com/SSEncrypt.module
  
  🇯🇵 JP = custom,jp.com,1234,rc4-md5,password,http://omgib13x8.bkt.clouddn.com/SSEncrypt.module
  
  🇸🇬 SG = custom,sg.com,1234,rc4-md5,password,http://omgib13x8.bkt.clouddn.com/SSEncrypt.module
  `,
      'Custom': "",
      'Rewrite': "",
      'Delete': "",
      'Host': "",
      'SSID': "",
      'extProxy': "",
      'hostname': "",
      'extProxyGroup': "",
      'MITM': `enable = true
  ca-passphrase = 4B676386
  ca-p12 = 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`,
  
    }
  }
  
  function saveConfig(result) {
    var success = $drive.write({
      data: $data({
        string: JSON.stringify(result)
      }),
      path: "surge.conf"
    })
  }
  
  function buildFile() {
    var ProxyList = getProxyName(config.Proxy).join(',');
    var result = `
[General]
${config.General}
[Proxy] 
🚀 Direct = direct
# my Proxy
${config.Proxy}
# my extProxy
${config.extProxy}
  
[Proxy Group]
🍃 Proxy = select, 🏃 Auto, 🚀 Direct,${ProxyList}
🍂 Domestic = select, 🚀 Direct, 🍃 Proxy
🍎 Only = select, 🚀 Direct,${ProxyList}
☁️ Others =  select,🚀 Direct,🍃 Proxy
🏃 Auto = url-test,${ProxyList},url = http://www.gstatic.com/generate_204, interval = 1200
# my extProxyGroup
${config.extProxyGroup}  
  
[Rule]
# my custom
${config.Custom}
# remote Apple
${remoteRule.Apple}
# remote REJECT
${remoteRule.REJECT}
# remote PROXY
${remoteRule.PROXY}
# remote DIRECT
${remoteRule.DIRECT}

# my ipRule  
${config.ipRule}
// Detect local network
GEOIP,CN,🍂 Domestic
// Use Proxy for all others
FINAL,☁️ Others

[Host]
# my host  
${config.Host}
# remote HOST
${remoteRule['HOST']}
  

[URL Rewrite] 
# my Rewrite
${config.Rewrite}
# remote URL REWRITE
${remoteRule['URL REWRITE']}
# remote URL REJECT
${remoteRule['URL REJECT']}

[Header Rewrite]
# remote HEADER REWRITE
${remoteRule['HEADER REWRITE']}

[SSID Setting]
# my SSID
${config.SSID}

# MITM
${config.MITM?'[MITM]':''}
${config.MITM?`hostname=${config.hostname.split('\n').join(',')},${remoteRule.Hostname.split('\n').join(',')}`:''}
${config.MITM}`;
    $share.sheet([config.filename || "surge.conf", $data({
      string: result
    })]);
    $ui.loading(false)
  }
  
  function getProxyName(proxys) {
    return proxys.match(/.+(?=\s=\s(custom|http|https|socks5|socks5-tls))/g)
  }
  
  
  let remoteIsDone = 0;
  let remoteRule = {};
  
  function build() {
    _.forEach(surgeList, function (name) {
      $console.info(name);
      if(config.remoteSwitch[name]===false){
        remoteIsDone++;
        remoteRule[name] = '';
        return;
      }
      $http.get({
        url: encodeURI([baseUrl, name, '.conf'].join('')),
        handler: function ({data}) {
          if(!data){
            $console.warn(`${name}拉取数据失败`)
          }
          
          remoteRule[name] = removeDeleteRule(data, name);
          remoteIsDone++;
          if (remoteIsDone >= surgeList.length) {
            buildFile();
          }
        }
      })
    })
  }
  const removeDeleteRule = (rule) => {
    const deleteds = config.Delete.split('\n');
    const orgRules = rule.split('\n');
    let result = [],
      deleted = [];
    orgRules.forEach((line) => {
      let isDeleted = false;
      deleteds.forEach(del => {
        if (del&&line.match(del)) {
          isDeleted = true;
        }
      });
      !isDeleted && result.push(line);
    });
    // $ui.alert(deleted.join('\n'))
    return result.join('\n')
  };
  const changeRemoteSwitch=function(key){
    let switchBtn = $(`switch-${key}`);
    config.remoteSwitch[key] = !switchBtn.on;
    switchBtn.on = config.remoteSwitch[key];
    console.log(`${key} = ${switchBtn.on}`)
  }


  $ui.render({
    layout: $layout.fill,
    views: [{
      type: "button",
      props: {
        title: "生成配置"
      },
      layout: function (make) {
        make.left.right.top.inset(10)
        make.height.equalTo(32)
      },
      events: {
        tapped: function (sender) {
          $ui.loading(true)
          let result = {
            ...config
          };
          fields.forEach((cus) => {
            let cfg = cus;
            if (typeof cus === 'string') {
              cfg = {
                name: cus
              }
            }
            result[cfg.name] = $(cfg.name).text
          })
          config = result;
          saveConfig(result);
          build()
          // //selectItem()
        }
      }
    }, {
      type: "list",
      layout: function (make) {
        make.left.bottom.right.equalTo(0)
        make.top.equalTo($("button").bottom).offset(0)
      },
      events:{
        rowHeight:function(sender,indexPath){
       
          return fields.length === indexPath.section?50:150;
        }
      },
      props: {
        data: fields.map(function (cus) {
          let cfg = cus;
          if (typeof cus === 'string') {
            cfg = {
              name: cus
            }
          }
          return {
            title: `${cfg.name} ${cfg.text?`(${cfg.text})`:''}`,
            rows: [{
              type: "text",
              props: {
                id: cfg.name,
                text: config[cfg.name] || '',
              },
              layout: function (make) {
                make.edges.inset(5);
              }
            }]
          }
        }).concat([{
          title:`远程规则开关`,
          rows:surgeList.map((key)=>{
            return {
              type:'view',
              props:{},
              layout:$layout.fill,
              events:{
                tapped:function(sender){
                  changeRemoteSwitch(key);
                }
              },
              views:[
                {
                  type:`switch`,
                  props:{
                    id:`switch-${key}`,
                    on:config.remoteSwitch[key]!==false
                  },
                  layout:function(make,view){
                    make.left.top.equalTo(10)
                  },
                  events:{
                    changed:function(sender){
                      changeRemoteSwitch(key);
                    }
                  }
                },
                {
                  type:'label',
                  props:{
                    text:key,
                    align:$align.center
                  },
                  layout:function(make){
                    make.top.equalTo(15);
                    make.left.equalTo(90)
                  }
                }
              ]
            }
          })
        }])
      }
    }]
  
  })