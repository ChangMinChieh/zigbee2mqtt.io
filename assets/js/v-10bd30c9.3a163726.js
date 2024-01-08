"use strict";(self.webpackChunkvp=self.webpackChunkvp||[]).push([[81562],{339820:(e,n,a)=>{a.r(n),a.d(n,{data:()=>t});const t=JSON.parse('{"key":"v-10bd30c9","path":"/advanced/remote-adapter/connect_to_a_remote_adapter.html","title":"Connect to a remote adapter","lang":"en-US","frontmatter":{"pageClass":"content-page"},"excerpt":"","headers":[{"level":2,"title":"1. Install ser2net","slug":"_1-install-ser2net","link":"#_1-install-ser2net","children":[]},{"level":2,"title":"2(a). Configure ser2net (<4.0)","slug":"_2-a-configure-ser2net-4-0","link":"#_2-a-configure-ser2net-4-0","children":[]},{"level":2,"title":"2(b). Configure ser2net (>=4.0)","slug":"_2-b-configure-ser2net-4-0","link":"#_2-b-configure-ser2net-4-0","children":[]},{"level":2,"title":"3. Configure","slug":"_3-configure","link":"#_3-configure","children":[]}],"git":{"updatedTime":1704740867000},"filePathRelative":"advanced/remote-adapter/connect_to_a_remote_adapter.md"}')},724125:(e,n,a)=>{a.r(n),a.d(n,{default:()=>r});var t=a(166252);const s=[(0,t.uE)('<h1 id="connect-to-a-remote-adapter" tabindex="-1"><a class="header-anchor" href="#connect-to-a-remote-adapter" aria-hidden="true">#</a> Connect to a remote adapter</h1><p>This how-to explains how to run Zigbee2MQTT with an adapter on a remote location. We will use ser2net for this which allows to connect to a serial port over TCP. In this way you can e.g. setup a Raspberry Pi Zero with the adapter connected while running Zigbee2MQTT on a different system. The instructions below have to be executed on the system where the adapter is connected to.</p><div class="custom-container warning"><p class="custom-container-title">WARNING</p><p>WiFi-based Serial-to-IP bridges are not recommended as the serial protocol does not have enough fault-tolerance to handle packet loss or latency delays that can normally occur over WiFi connections.</p></div><h2 id="_1-install-ser2net" tabindex="-1"><a class="header-anchor" href="#_1-install-ser2net" aria-hidden="true">#</a> 1. Install ser2net</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">apt-get</span> <span class="token function">install</span> ser2net\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_2-a-configure-ser2net-4-0" tabindex="-1"><a class="header-anchor" href="#_2-a-configure-ser2net-4-0" aria-hidden="true">#</a> 2(a). Configure ser2net (&lt;4.0)</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">nano</span> /etc/ser2net.conf\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Add the following entry, replace <code>/dev/ttyACM0</code> with the correct path to your adapter.</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>20108:raw:0:/dev/ttyACM0:115200 8DATABITS NONE 1STOPBIT\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>After this reboot the system.</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">reboot</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_2-b-configure-ser2net-4-0" tabindex="-1"><a class="header-anchor" href="#_2-b-configure-ser2net-4-0" aria-hidden="true">#</a> 2(b). Configure ser2net (&gt;=4.0)</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">sudo</span> <span class="token function">nano</span> /etc/ser2net.yaml\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Add the following entry, replace <code>/dev/ttyACM0</code> with the correct path to your adapter.</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>connection: &amp;con01\n  accepter: tcp,20108\n  connector: serialdev,/dev/ttyACM0,115200n81,local\n  options:\n    kickolduser: true\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>With a Slaesh coordinator, you need to set the DTR and RTS pins of the RS232 interfece in a specific way. The current (2023-02-04) version of Raspberry Pi OS does not have recent enough of ser2net to do that correctly, see https://github.com/cminyard/ser2net/issues/46. You might need to build the &quot;gensi&quot; and the &quot;ser2net&quot; packages on your rpi yourself. Other distributions might already have a more recent version. Once you have a version of ser2net that supports the &quot;dtr=off&quot; setting, use the following configuration:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>connection: &amp;con01\n  accepter: tcp,20108\n  connector: serialdev,/dev/ttyACM0,115200n81,local,dtr=off,rts=off\n  options:\n    kickolduser: true\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>For ConBee II / RaspBee II, use the following configuration:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>connection: &amp;con01\n  accepter: tcp,20108\n  connector: serialdev,/dev/ttyACM0,115200n81,nobreak,local\n  options:\n    kickolduser: true\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>After this reboot the system.</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">reboot</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_3-configure" tabindex="-1"><a class="header-anchor" href="#_3-configure" aria-hidden="true">#</a> 3. Configure</h2><p>Now edit the Zigbee2MQTT <code>configuration.yaml</code> accordingly, replace <code>192.168.2.13</code> with the IP or hostname of your system where the adapter is connected to.</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">serial</span><span class="token punctuation">:</span>\n    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token string">&#39;tcp://192.168.2.13:20108&#39;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>Done! Now you can start Zigbee2MQTT.</p>',25)],i={},r=(0,a(983744).Z)(i,[["render",function(e,n){return(0,t.wg)(),(0,t.iD)("div",null,s)}]])}}]);