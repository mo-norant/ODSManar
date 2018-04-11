export class Utils{

 
  
static      devlink = 'http://10.211.55.3:45455/'
static     productionlink = 'http://jansenbyods.com/'

static     inDevelopment : boolean = false;

     static getRoot(): any {

        if(this.inDevelopment){
            
            return this.devlink
        }
    
        return this.productionlink;
    
        }
    
   

}