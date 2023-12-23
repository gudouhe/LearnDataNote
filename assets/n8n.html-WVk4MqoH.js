import{_ as i}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as o,o as c,c as p,a as n,b as s,d as e,e as t}from"./app-srgNPgTf.js";const l={},r={href:"https://github.com/n8n-io/n8n",target:"_blank",rel:"noopener noreferrer"},u={href:"https://sspai.com/prime/story/automation-n8n",target:"_blank",rel:"noopener noreferrer"},d={href:"https://reorx.com/blog/sharing-my-footprints-automation/",target:"_blank",rel:"noopener noreferrer"},k=t(`<h2 id="部署-n8n" tabindex="-1"><a class="header-anchor" href="#部署-n8n" aria-hidden="true">#</a> 部署 n8n</h2><ol><li>执行 <code>git clone https://github.com/n8n-io/n8n.git</code> 命令下载 n8n 仓库文件。</li><li>切换路径 <code>cd /volume3/storage/n8n/docker/compose/withPostgres</code>。</li><li>运行 <code>sudo docker-compose up -d</code> 命令进行部署。</li></ol><p>初次部署时，可能会出现 <code>for n8n Container &quot;5a6edd16e779&quot; is unhealthy.</code> 的提示。请忽略该提示，然后再次运行 <code>sudo docker-compose up -d</code> 命令即可解决问题。如果你更新了 git 仓库文件，重新部署时可能会提示无需更新。在这种情况下，你可以首先删除容器，然后重新部署。</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># https://github.com/n8n-io/n8n/tree/master/docker/compose/withPostgres</span>
<span class="token comment"># https://docs.n8n.io/hosting/installation/server-setups/docker-compose/#5-create-docker-compose-file</span>
<span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&quot;3.8&quot;</span>

<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">n8n-postgres</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> postgres<span class="token punctuation">:</span><span class="token number">11</span>
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> n8n<span class="token punctuation">-</span>postgres
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> POSTGRES_USER
      <span class="token punctuation">-</span> POSTGRES_PASSWORD
      <span class="token punctuation">-</span> POSTGRES_DB
      <span class="token punctuation">-</span> POSTGRES_NON_ROOT_USER
      <span class="token punctuation">-</span> POSTGRES_NON_ROOT_PASSWORD
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> /volume1/docker/n8n/db<span class="token punctuation">:</span>/var/lib/postgresql/data
      <span class="token punctuation">-</span> ./init<span class="token punctuation">-</span>data.sh<span class="token punctuation">:</span>/docker<span class="token punctuation">-</span>entrypoint<span class="token punctuation">-</span>initdb.d/init<span class="token punctuation">-</span>data.sh
    <span class="token key atrule">healthcheck</span><span class="token punctuation">:</span>
      <span class="token key atrule">test</span><span class="token punctuation">:</span>
        <span class="token punctuation">[</span>
          <span class="token string">&quot;CMD-SHELL&quot;</span><span class="token punctuation">,</span>
          <span class="token string">&quot;pg_isready -h localhost -U \${POSTGRES_USER} -d \${POSTGRES_DB}&quot;</span><span class="token punctuation">,</span>
        <span class="token punctuation">]</span>
      <span class="token key atrule">interval</span><span class="token punctuation">:</span> 5s
      <span class="token key atrule">timeout</span><span class="token punctuation">:</span> 5s
      <span class="token key atrule">retries</span><span class="token punctuation">:</span> <span class="token number">10</span>

  <span class="token key atrule">n8n</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> docker.n8n.io/n8nio/n8n
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> n8n
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> N8N_HOST=$<span class="token punctuation">{</span>N8N_HOST<span class="token punctuation">}</span>
      <span class="token punctuation">-</span> NODE_ENV=production
      <span class="token punctuation">-</span> N8N_EDITOR_BASE_URL=$<span class="token punctuation">{</span>N8N_EDITOR_BASE_URL<span class="token punctuation">}</span>
      <span class="token punctuation">-</span> VUE_APP_URL_BASE_API=$<span class="token punctuation">{</span>N8N_EDITOR_BASE_URL<span class="token punctuation">}</span>
      <span class="token punctuation">-</span> WEBHOOK_URL=$<span class="token punctuation">{</span>N8N_EDITOR_BASE_URL<span class="token punctuation">}</span>
      <span class="token punctuation">-</span> DB_TYPE=postgresdb
      <span class="token punctuation">-</span> DB_POSTGRESDB_HOST=n8n<span class="token punctuation">-</span>postgres
      <span class="token punctuation">-</span> DB_POSTGRESDB_PORT=5432
      <span class="token punctuation">-</span> DB_POSTGRESDB_DATABASE=$<span class="token punctuation">{</span>POSTGRES_DB<span class="token punctuation">}</span>
      <span class="token punctuation">-</span> DB_POSTGRESDB_USER=$<span class="token punctuation">{</span>POSTGRES_NON_ROOT_USER<span class="token punctuation">}</span>
      <span class="token punctuation">-</span> DB_POSTGRESDB_PASSWORD=$<span class="token punctuation">{</span>POSTGRES_NON_ROOT_PASSWORD<span class="token punctuation">}</span>
      <span class="token punctuation">-</span> TZ=Asia/Shanghai
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> 5720<span class="token punctuation">:</span><span class="token number">5678</span>
    <span class="token key atrule">links</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> n8n<span class="token punctuation">-</span>postgres
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> /volume1/docker/n8n/storage<span class="token punctuation">:</span>/home/node/.n8n
    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span>
      <span class="token key atrule">n8n-postgres</span><span class="token punctuation">:</span>
        <span class="token key atrule">condition</span><span class="token punctuation">:</span> service_healthy
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述文件中，我将 <code>/volume1/docker/n8n</code> 指定为 n8n 的设置目录，需要将该路径的读写权限授予 n8n，否则项目启动时可能会报错。</p><h2 id="环境变量" tabindex="-1"><a class="header-anchor" href="#环境变量" aria-hidden="true">#</a> 环境变量</h2><p>PostgreSQL 的默认数据库名称、用户和密码可以在当前目录的 <code>.env</code> 文件中更改。</p><div class="language-env line-numbers-mode" data-ext="env"><pre class="language-env"><code>N8N_HOST=localnas.com
N8N_EDITOR_BASE_URL=http://localnas.com:5720/

POSTGRES_USER=changeUser
POSTGRES_PASSWORD=changePassword
POSTGRES_DB=n8n

POSTGRES_NON_ROOT_USER=changeUser
POSTGRES_NON_ROOT_PASSWORD=changePassword
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>N8N_HOST</code> 和 <code>N8N_EDITOR_BASE_URL</code> 用于第三方 API 的回调访问。如果你启用了外网调用 n8n 的访问权限，建议开启 Two-factor authentication (2FA)，以防止 API 信息泄露。不建议将 <code>N8N_HOST</code> 设为内部域名，否则在后续设置中可能会出现 <code>Bad Request: bad webhook: An HTTPS URL must be provided for webhook</code> 错误。</p><h2 id="节点" tabindex="-1"><a class="header-anchor" href="#节点" aria-hidden="true">#</a> 节点</h2><h3 id="http-request" tabindex="-1"><a class="header-anchor" href="#http-request" aria-hidden="true">#</a> HTTP Request</h3>`,11),v={href:"https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/",target:"_blank",rel:"noopener noreferrer"},h=n("p",null,"网页端有时可能经常容易连不上，如果你不希望卡住，注意在节点设置的 On Error 选择为 Continue，并在 Options 中添加超时选项 Timeout 10000 ms。",-1),m=n("h3",{id:"if",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#if","aria-hidden":"true"},"#"),s(" IF")],-1),b={href:"https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.if/",target:"_blank",rel:"noopener noreferrer"},_=t('<figure><img src="https://img.newzone.top/2023-12-12-22-43-08.png?imageMogr2/format/webp?imageMogr2/format/webp/thumbnail/400x" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="github-trigger" tabindex="-1"><a class="header-anchor" href="#github-trigger" aria-hidden="true">#</a> Github Trigger</h3><p>Github Trigger 通过在 Github 上建立 Webhook 来获取推送。</p><p>有时，节点的设置可能出错，导致以下错误提示：<code>Workflow could not be activated: A webhook with the identical URL probably exists already. Please delete it manually on Github!</code>。这是因为在仓库中存在多个相同的 Webhook 地址所致。请进入 repo 仓库，选择 <code>Settings &gt; Code and automation &gt; Webhooks</code>，手动删除重复的 Webhook 地址，即可使其正常运行。</p><h2 id="使用-tips" tabindex="-1"><a class="header-anchor" href="#使用-tips" aria-hidden="true">#</a> 使用 Tips</h2><h3 id="变量路径" tabindex="-1"><a class="header-anchor" href="#变量路径" aria-hidden="true">#</a> 变量路径</h3><p>对于一些复杂的输入变量，你可以直接使用 n8n 自带的工具复制路径。在 INPUT 区域选择 JSON，然后点击要选择的参数，接着点击 INPUT 右上角的复制按钮，选择 <code>Copy Parameter Path</code>。</p><figure><img src="https://img.newzone.top/2023-12-14-12-37-36.png?imageMogr2/format/webp" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="其他操作记录" tabindex="-1"><a class="header-anchor" href="#其他操作记录" aria-hidden="true">#</a> 其他操作记录</h2><h3 id="discord-oauth2" tabindex="-1"><a class="header-anchor" href="#discord-oauth2" aria-hidden="true">#</a> Discord OAuth2</h3>',10),g={href:"https://discord.com/developers/applications",target:"_blank",rel:"noopener noreferrer"},S=n("p",null,"然后将 CLIENT ID 和 CLIENT SECRET 添加到 n8n 即可。",-1),O={href:"https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-",target:"_blank",rel:"noopener noreferrer"};function R(T,E){const a=o("ExternalLinkIcon");return c(),p("div",null,[n("p",null,[n("a",r,[s("n8n"),e(a)]),s(" 是一款可扩展的工作流程自动化工具。n8n 可用于自行托管，并允许你添加自定义函数、逻辑和应用程序。社区有多种第三方 API 节点，可连接主流海外服务。")]),n("p",null,[s("对于初学者，建议按照"),n("a",u,[s("基于 n8n 的开源自动化：以滴答清单同步 Notion 为例"),e(a)]),s(" 教程进行操作，以熟悉 n8n 的广泛应用。有关使用案例的更多信息，请参阅"),n("a",d,[s("使用自动化工作流聚合信息摄入和输出"),e(a)]),s("。")]),k,n("p",null,[n("a",v,[s("HTTP Request"),e(a)]),s(" 是使用 REST API 发出 HTTP 请求以查询来自任何应用程序或服务的数据。")]),h,m,n("p",null,[n("a",b,[s("IF"),e(a)]),s(" 是根据比较操作有条件地分割工作流。请注意，Boolean 判断的 true、false 需要使用双重花括号框中。")]),_,n("p",null,[s("在 "),n("a",g,[s("Discord Applications"),e(a)]),s(" 新建任意名称的应用，然后在 OAuth2>General > Redirects 中添加回调地址。")]),S,n("ul",null,[n("li",null,[n("a",O,[s("Where can I find my User/Server/Message ID?"),e(a)])])])])}const N=i(l,[["render",R],["__file","n8n.html.vue"]]);export{N as default};