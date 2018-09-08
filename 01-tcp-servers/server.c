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
    servaddr.sin_port = htons(3000);
 
    bind(listen_fd, (struct sockaddr *) &servaddr, sizeof(servaddr));

    do {
 
        listen(listen_fd, 10);
     
        comm_fd = accept(listen_fd, (struct sockaddr*) NULL, NULL);
     
        do
        {
            bzero( str, 100);
     
            read_len = read(comm_fd,str,100);
            if ( read_len) {
                printf("Echoing back - %s",str);
     
                write(comm_fd, str, strlen(str)+1);
            }
        } while (read_len > 0);
        printf("Client disconnected, listening for another connection");
    } while (1);
}