#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int random(int a, int b){
    srand(time(0));
    int r = rand();
    r %= b-a;
    r += a;
    return r;
}

typedef struct node
{
    int data;
    struct node* next;

} Node;

Node* createList(int first_data){
    Node* head = (Node*)malloc(sizeof(Node));
    head->data = first_data;
    head->next = NULL;
}

void push(Node* head, int new_data){
    Node* temp = (Node*)malloc(sizeof(Node));
    temp->data = new_data;
    temp->next = NULL;
    while(head->next != NULL){
        head = head->next;
    }
    head->next = temp;  
}

void pop(Node** head){
    printf("hi");
    while((*head)->next != NULL){
        *head = (*head)->next;
    }
    *head = NULL;  
}

void print_list(Node* head){
    Node* temp = head;
    while(temp!= NULL){
        printf("%d ->", temp->data);
        temp = temp->next;
    }
}

int main(){
    
    Node* head = createList(0);

    for(int i=0;i<10;i++){
        push(head, rand()%10);
    }
    // push(head, 10);
    // Node* second = (Node*) malloc(sizeof(Node));
    // second->data = 20;
    // second->next = NULL;
    // head->next = second;
    print_list(head);
    pop(&head);
    pop(&head);
    pop(&head);
    pop(&head);
    pop(&head);
    printf("\n\n\n\n");
    print_list(head);
    // printf("%d, %d", head->data, head->next);

    // printf("%p", &head);
}