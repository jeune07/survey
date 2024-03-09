const BandList = require("./band-list")

class Sockets {
    constructor( io ) {
        this.io = io;
        this.bandList=  new BandList();
        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {
            this.io.emit('current-band', this.bandList.getBands() );                 
            
             //increase Votes
        socket.on('increaseVote', ( id ) => {
            this.bandList.increaseVotes(id)  
            this.io.emit('current-band', this.bandList.getBands() );    
        });

        socket.on("deleteband",(id)=>{
            this.bandList.removeBand(id);
            this.io.emit("current-band",this.bandList.getBands());
        });

        socket.on("deleteband",({id,name})=>{
            this.bandList.changeName(id,name);
            this.io.emit("current-band",this.bandList.getBands());
        });

        socket.on("crear-banda",({nombre})=>{
            this.bandList.addBandd(nombre);
            this.io.emit("current-band",this.bandList.getBands());
        });
        
        });

       
    }


}


module.exports = Sockets;