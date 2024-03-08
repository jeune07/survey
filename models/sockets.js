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
            socket.emit('current-band', this.bandList.getBands() );                 
            
             //increase Votes
        socket.on('increaseVote', ( id ) => {
            this.bandList.increaseVotes(id)  
            socket.emit('current-band', this.bandList.getBands() );    
        });

        socket.on("deleteband",(id)=>{
            this.bandList.removeBand(id);
            socket.emit("current-band",this.bandList.getBands());
        });

        socket.on("deleteband",({id,name})=>{
            this.bandList.changeName(id,name);
            socket.emit("current-band",this.bandList.getBands());
        });

        socket.on("addBand",({name})=>{
            this.bandList.addBandd(name);
            socket.emit("current-band",this.bandList.getBands());
        });
        
        });

       
    }


}


module.exports = Sockets;