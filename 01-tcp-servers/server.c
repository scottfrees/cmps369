#include <sys/types.h>
#include <sys/socket.h>
#include <netdb.h>
#include <stdio.h>
#include <string.h>
 
int main()
{
    char str[100];
    int listen_fd, comm_fd;
    int read_len;
    struct sockaddr_in servaddr;
 
    listen_fd = socket(AF_INET, SOCK_STREAM, 0);
 
    bzero( &servaddr, sizeof(servaddr));
 
    servaddr.sin_family = AF_INET;
    servaddr.sin_addr.s_addr = htons(INADDR_ANY);
    servaddr.sin_port = htons(3001);
 
    bind(listen_fd, (struct sockaddr *) &servaddr, sizeof(servaddr));

    do {
 
        listen(listen_fd, 10);
     
        comm_fd = accept(listen_fd, (struct sockaddr*) NULL, NULL);
        fprintf(stdout, "Client socket has connected\n");
        do
        {
            bzero( str, 100);
            fprintf(stdout, "Reading from client socket\n");
            read_len = read(comm_fd,str,100);
            if ( read_len) {
                fprintf(stdout, "C Server - Responding to client -> %s\n",str);
     
                write(comm_fd, str, strlen(str)+1);
            }
        } while (read_len > 0);
        fprintf(stdout, "Client disconnected, listening for another connection\n");
    } while (1);
}