import server from './app';

// todo: use dotconfig and process env variables
server.listen(8080, (): void => {
    console.log('Server running at port 8080');
});