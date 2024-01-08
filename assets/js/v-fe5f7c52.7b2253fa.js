"use strict";(self.webpackChunkvp=self.webpackChunkvp||[]).push([[84540],{205545:(e,n,a)=>{a.r(n),a.d(n,{data:()=>s});const s=JSON.parse('{"key":"v-fe5f7c52","path":"/guide/installation/06_freebsd_jail.html","title":"FreeBSD jail","lang":"en-US","frontmatter":{"pageClass":"content-page","next":"../configuration/"},"excerpt":"","headers":[{"level":2,"title":"Jail creation","slug":"jail-creation","link":"#jail-creation","children":[]},{"level":2,"title":"Installing","slug":"installing","link":"#installing","children":[]},{"level":2,"title":"Configuring","slug":"configuring","link":"#configuring","children":[]},{"level":2,"title":"Starting Zigbee2MQTT","slug":"starting-zigbee2mqtt","link":"#starting-zigbee2mqtt","children":[]},{"level":2,"title":"(Optional) Running as a daemon with rc","slug":"optional-running-as-a-daemon-with-rc","link":"#optional-running-as-a-daemon-with-rc","children":[]},{"level":2,"title":"(For later) Update Zigbee2MQTT to the latest version","slug":"for-later-update-zigbee2mqtt-to-the-latest-version","link":"#for-later-update-zigbee2mqtt-to-the-latest-version","children":[]}],"git":{"updatedTime":1704740867000},"filePathRelative":"guide/installation/06_freebsd_jail.md"}')},386407:(e,n,a)=>{a.r(n),a.d(n,{default:()=>u});var s=a(166252);const i=(0,s._)("h1",{id:"freebsd-jail",tabindex:"-1"},[(0,s._)("a",{class:"header-anchor",href:"#freebsd-jail","aria-hidden":"true"},"#"),(0,s.Uk)(" FreeBSD jail")],-1),t={href:"https://en.wikipedia.org/wiki/FreeBSD_jail",target:"_blank",rel:"noopener noreferrer"},l={href:"https://www.truenas.com/truenas-core/",target:"_blank",rel:"noopener noreferrer"},o=(0,s._)("em",null,"Mosquitto MQTT",-1),r=(0,s.uE)('<h2 id="jail-creation" tabindex="-1"><a class="header-anchor" href="#jail-creation" aria-hidden="true">#</a> Jail creation</h2><p>First we have to create the jail that will run both Zigbee2MQTT and Mosquitto. We can do that by opening the TrueNAS Web UI, navigating to <code>Plugins</code>, selecting <code>Community</code> plugins and then <code>Mosquitto MQTT</code>.</p><p>To enter the jail&#39;s terminal, we can use the Web UI&#39;s <em>Shell</em> feature under <em>Jails</em>, or SSH into TrueNAS and then</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> iocage console <span class="token operator">&lt;</span>jail-name<span class="token operator">&gt;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="installing" tabindex="-1"><a class="header-anchor" href="#installing" aria-hidden="true">#</a> Installing</h2><p>Enter the following commands inside the jail&#39;s shell:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># Install Node.js and required dependencies:</span>\n<span class="token comment"># - It is recommended to install Node 16 from the official Node repository. Check https://github.com/nodesource/distributions/blob/master/README.md on how to do this.</span>\n<span class="token comment"># - Older i386 hardware can work with [unofficial-builds.nodejs.org](https://unofficial-builds.nodejs.org/download/release/v16.15.0/ e.g. Version 16.15.0 should work.</span>\n<span class="token comment"># - Selecting `npm` also installs `node`.</span>\npkg <span class="token function">install</span> <span class="token function">npm</span> <span class="token function">git</span> gmake gcc\n\n<span class="token comment"># Verify that the correct nodejs and npm (automatically installed with nodejs)</span>\n<span class="token comment"># version has been installed</span>\n<span class="token function">node</span> <span class="token parameter variable">--version</span>  <span class="token comment"># Should output V18.x, V20.x, V21.X</span>\n<span class="token function">npm</span> <span class="token parameter variable">--version</span>  <span class="token comment"># Should output 9.X or 10.X</span>\n\n<span class="token comment"># Create installation folder (/usr/local prefix is used for software not part of the base system)</span>\n<span class="token function">mkdir</span> <span class="token parameter variable">-p</span> /usr/local/opt/zigbee2mqtt\n<span class="token builtin class-name">cd</span> /usr/local/opt/zigbee2mqtt\n\n<span class="token comment"># Clone Zigbee2MQTT repository</span>\n<span class="token function">git</span> clone <span class="token parameter variable">--depth</span> <span class="token number">1</span> https://github.com/Koenkk/zigbee2mqtt.git <span class="token builtin class-name">.</span>\n\n<span class="token comment"># Install dependencies</span>\n<span class="token function">npm</span> ci\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>If everything went correctly the output of <code>npm ci</code> is similar to (the number of packages and seconds is probably different on your device):</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>node-pre-gyp info ok\nadded <span class="token number">383</span> packages <span class="token keyword">in</span> <span class="token number">111</span>.613s\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>Note that the <code>npm ci</code> produces some <code>warning</code> which can be ignored.</p><h2 id="configuring" tabindex="-1"><a class="header-anchor" href="#configuring" aria-hidden="true">#</a> Configuring</h2>',11),d=(0,s.uE)('<p>Note that the <code>configuration.yaml</code> is at a different location:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/usr/local/opt/zigbee2mqtt/data/configuration.yaml\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Also note that if you need <code>nano</code> for editing the configuration, you&#39;ll have to install it first:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>pkg <span class="token function">install</span> <span class="token function">nano</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="starting-zigbee2mqtt" tabindex="-1"><a class="header-anchor" href="#starting-zigbee2mqtt" aria-hidden="true">#</a> Starting Zigbee2MQTT</h2><p>Now that we have setup everything correctly we can start Zigbee2MQTT.</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> /usr/local/opt/zigbee2mqtt\n<span class="token function">npm</span> start\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>When started successfully, you will see something like:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>Zigbee2MQTT:info  <span class="token number">2019</span>-11-09T13:04:01: Logging to directory: <span class="token string">&#39;/opt/zigbee2mqtt/data/log/2019-11-09.14-04-01&#39;</span>\nZigbee2MQTT:info  <span class="token number">2019</span>-11-09T13:04:01: Starting Zigbee2MQTT version <span class="token number">1.6</span>.0 <span class="token punctuation">(</span>commit <span class="token comment">#720e393)</span>\nZigbee2MQTT:info  <span class="token number">2019</span>-11-09T13:04:01: Starting zigbee-herdsman<span class="token punctuation">..</span>.\nZigbee2MQTT:info  <span class="token number">2019</span>-11-09T13:04:03: zigbee-herdsman started\nZigbee2MQTT:info  <span class="token number">2019</span>-11-09T13:04:03: Coordinator firmware version: <span class="token string">&#39;{&quot;type&quot;:&quot;zStack30x&quot;,&quot;meta&quot;:{&quot;transportrev&quot;:2,&quot;product&quot;:2,&quot;majorrel&quot;:2,&quot;minorrel&quot;:7,&quot;maintrel&quot;:2,&quot;revision&quot;:20190425}}&#39;</span>\nZigbee2MQTT:info  <span class="token number">2019</span>-11-09T13:04:03: Currently <span class="token number">0</span> devices are joined:\nZigbee2MQTT:warn  <span class="token number">2019</span>-11-09T13:04:03: <span class="token variable"><span class="token variable">`</span>permit_join<span class="token variable">`</span></span> <span class="token builtin class-name">set</span> to  <span class="token variable"><span class="token variable">`</span><span class="token boolean">true</span><span class="token variable">`</span></span> <span class="token keyword">in</span> configuration.yaml.\nZigbee2MQTT:warn  <span class="token number">2019</span>-11-09T13:04:03: Allowing new devices to join.\nZigbee2MQTT:warn  <span class="token number">2019</span>-11-09T13:04:03: Set <span class="token variable"><span class="token variable">`</span>permit_join<span class="token variable">`</span></span> to <span class="token variable"><span class="token variable">`</span><span class="token boolean">false</span><span class="token variable">`</span></span> once you joined all devices.\nZigbee2MQTT:info  <span class="token number">2019</span>-11-09T13:04:03: Zigbee: allowing new devices to join.\nZigbee2MQTT:info  <span class="token number">2019</span>-11-09T13:04:03: Connecting to MQTT server at mqtt://localhost\nZigbee2MQTT:info  <span class="token number">2019</span>-11-09T13:04:03: Connected to MQTT server\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Zigbee2MQTT can be stopped by pressing <code>CTRL + C</code>.</p><h2 id="optional-running-as-a-daemon-with-rc" tabindex="-1"><a class="header-anchor" href="#optional-running-as-a-daemon-with-rc" aria-hidden="true">#</a> (Optional) Running as a daemon with rc</h2><p>To run Zigbee2MQTT as a daemon (in background) and start it automatically on jail start we will create a service file for it.</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># Create service file for Zigbee2MQTT (assuming `nano` is installed, `vi` can also be used)</span>\n<span class="token function">nano</span> /usr/local/etc/rc.d/zigbee2mqtt\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>Add the following to this file:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>#!/bin/sh\n\n# PROVIDE: zigbee2mqtt\n# REQUIRE: DAEMON NETWORKING\n# BEFORE: LOGIN\n# KEYWORD: shutdown\n\n. /etc/rc.subr\n\nname=&quot;zigbee2mqtt&quot;\nrcvar=zigbee2mqtt_enable\n\n: ${zigbee2mqtt_enable:=&quot;NO&quot;}\n\n# daemon\npidfile=&quot;/var/run/${name}.pid&quot;\nnode=&quot;/usr/local/bin/node&quot;\nscript_js=&quot;/usr/local/opt/zigbee2mqtt/index.js&quot;\ncommand=/usr/sbin/daemon\nprocname=&quot;daemon&quot;\ncommand_args=&quot; -c -f -P ${pidfile} ${node} ${script_js}&quot;\n\nload_rc_config $name\nrun_rc_command &quot;$1&quot;\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Save the file and exit.</p><p>Make it executable:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">chmod</span> +x /usr/local/etc/rc.d/zigbee2mqtt\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Verify that the configuration works:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># Start Zigbee2MQTT without enabling it</span>\n<span class="token function">service</span> zigbee2mqtt onestart\n\n<span class="token comment"># Show status</span>\n<span class="token function">service</span> zigbee2mqtt onestatus\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Output should look like:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>root@zigbee2mqtt:/usr/local/opt/zigbee2mqtt # service zigbee2mqtt onestatus\nzigbee2mqtt is running as pid 80246.\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>Now that everything works, we want the init system to start Zigbee2MQTT automatically when the jail starts. This can be done by executing:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">service</span> zigbee2mqtt <span class="token builtin class-name">enable</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Done! 😃</p><p>Some tips that can be handy later:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># Stopping Zigbee2MQTT</span>\n<span class="token function">service</span> zigbee2mqtt stop\n\n<span class="token comment"># Starting Zigbee2MQTT</span>\n<span class="token function">service</span> zigbee2mqtt start\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="for-later-update-zigbee2mqtt-to-the-latest-version" tabindex="-1"><a class="header-anchor" href="#for-later-update-zigbee2mqtt-to-the-latest-version" aria-hidden="true">#</a> (For later) Update Zigbee2MQTT to the latest version</h2><p>To update Zigbee2MQTT to the latest version, execute:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># Run the update script from the Zigbee2MQTT directory</span>\n<span class="token builtin class-name">cd</span> /opt/zigbee2mqtt\n./update.sh\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>',30),c={},u=(0,a(983744).Z)(c,[["render",function(e,n){const a=(0,s.up)("ExternalLinkIcon"),c=(0,s.up)("RouterLink");return(0,s.wg)(),(0,s.iD)("div",null,[i,(0,s._)("p",null,[(0,s.Uk)("These instructions explain how to run Zigbee2MQTT in a "),(0,s._)("a",t,[(0,s.Uk)("FreeBSD jail"),(0,s.Wm)(a)]),(0,s.Uk)(".")]),(0,s._)("p",null,[(0,s.Uk)("For the sake of simplicity this guide assumes running on "),(0,s._)("a",l,[(0,s.Uk)("TrueNAS CORE"),(0,s.Wm)(a)]),(0,s.Uk)(" and installing Zigbee2MQTT in the "),o,(0,s.Uk)(" jail to be used with Home Assistant. This setup only uses MQTT for interfacing between Zigbee and Home Assistant. The instructions should otherwise work on any FreeBSD machine.")]),r,(0,s._)("p",null,[(0,s.Uk)("Configuration is the same as on "),(0,s.Wm)(c,{to:"/guide/installation/01_linux.html#configuring"},{default:(0,s.w5)((()=>[(0,s.Uk)("Linux")])),_:1}),(0,s.Uk)(".")]),d])}]])}}]);