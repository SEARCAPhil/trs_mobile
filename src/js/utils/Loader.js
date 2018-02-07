export class Loader{

	constructor(){}

	//lazy load external scripts
	load(src=[],opts={}){
		return new Promise((resolve,reject)=>{
			//options
			let opt=opts
			opt.async=opts.async||false
			opt.once=opts.once||false

			for(let file of src){
				//script
				let sc=document.createElement('script')
				sc.src=file
				//attributes
				if(opt.async) sc.setAttribute('async','')
				//mark as loaded by lazy loader func
				if(opt.module) sc.setAttribute('type','module')
				sc.setAttribute('lazy-loaded','')
				document.body.appendChild(sc)
				resolve(sc)
								
			}
		})
	}

	//parse script and link tags in DOM
	loadInline(scope){
		
		scope.querySelectorAll('script').forEach((sc,index)=>{
			let el=document.createElement('script')
			el.src=sc.getAttribute('src')
			if(sc.async) el.setAttribute('async','')
			sc.replaceWith(el)
		})

		scope.querySelectorAll('link').forEach((sc,index)=>{
			let el=document.createElement('link')
			el.href=sc.getAttribute('href')
			el.type="text/css"
			el.rel="stylesheet"
			sc.replaceWith(el)
		})
		
	}

}


export class XHR{
	request(props){
		this.props=props||{};
		this.xhr=new XMLHttpRequest();
		//xhr promise
		return new Promise((resolve,reject)=>{
			this.xhr.open(this.props.method||'GET',this.props.url);
			//request headers
			if(this.props.headers){
				for(let header in this.props.headers){
					
					this.xhr.setRequestHeader(header, this.props.headers[header])
				}	
				
			}

			this.xhr.onload=()=>{
				if(this.xhr.status==200&&this.xhr.readyState==4){
					resolve(this.xhr.response)
				}else{
					reject(this.xhr.statusText)
				}
			}

			this.xhr.onerror=()=>{
				reject(this.xhr.statusText)
			}

			this.abort=()=>{
				this.xhr.abort()
			}

			this.xhr.send(this.props.body||null)

		})
	}

}