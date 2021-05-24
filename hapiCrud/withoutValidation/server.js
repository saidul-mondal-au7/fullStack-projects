const Hapi = require('@hapi/hapi');
require('./db');
const Task = require('./model');

const init = async () => {
    const server = new Hapi.Server({
        port : 3000,
        host : "localhost"
    });
    
    server.route({
        method: 'POST',
        path : "/tasks",
        handler: async (request, h) => {
            try{
                const newTask = new Task(request.payload);
                const task = await newTask.save();
                return h.response(task)
            }catch(e){
                return h.response(e).code(500)
            }
        }
    });
    server.route({
        method: "GET",
        path : "/tasks",
        handler: async (request, h) => {
            try{
                const allTask = await Task.find();
                return h.response(allTask)
            }catch(e){
                return h.response(e).code(500)
            }
        }
    });
    server.route({
        method: "GET",
        path : "/tasks/{id}",
        handler: async (request, h) => {
            try{
                const task = await Task.findById(request.params.id);
                return h.response(task)
            }catch(e){
                return h.response(e).code(500)
            }
        }
    });
    server.route({
        method: "PATCH",
        path : "/tasks/{id}",
        handler: async (request, h) => {
            try{
                const task = await Task.findByIdAndUpdate(
                    request.params.id,
                    request.payload,
                    {
                        new : true
                    }
                    );
                return h.response(task)
            }catch(e){
                return h.response(e).code(500)
            }
        }
    })
    server.route({
        method: "DELETE",
        path : "/tasks/{id}",
        handler: async (request, h) => {
            try{
                const task = await Task.findByIdAndDelete(request.params.id);
                return h.response(task)
            }catch(e){
                return h.response(e).code(500)
            }
        }
    })
  await server.start()
  console.log("Server is on " + server.info.uri)
}

process.on("unhandledRejection", err => {
    console.log(err);
    process.exit(1);
  });

init()

