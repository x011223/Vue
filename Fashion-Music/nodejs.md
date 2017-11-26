
		url解析; > url
{ Url: [Function: Url],
  parse: [Function: urlParse],
  resolve: [Function: urlResolve],
  resolveObject: [Function: urlResolveObject],
  format: [Function: urlFormat],
  URL: [Function: URL],
  URLSearchParams: [Function: URLSearchParams],
  domainToASCII: [Function: domainToASCII],
  domainToUnicode: [Function: domainToUnicode] }



		//转义
		querystring.scape('七日热门 - 简书')
		结果: 7%E6%97%A5%E7%83%AD%E9%97%A8%20-%20%E7%AE%80%E4%B9%A6


		//反转义
		querystring.unscape('7%E6%97%A5%E7%83%AD%E9%97%A8%20-%20%E7%AE%80%E4%B9%A6')
		结果: 七日热门 - 简书
