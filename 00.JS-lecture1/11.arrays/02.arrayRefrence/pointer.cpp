// Online C++ compiler to run C++ program online
#include <iostream>

int main() {
    // Write C++ code here
    int arr[3]={1,2,3};
    int *ptrArray=arr;//this will store the memory address of the first 
    //element in the array
    std::cout<<(*ptrArray+0);//from current memory address add 0 
    std::cout<<std::endl;
    std::cout<<(*ptrArray+1);//form current memory address get the next
    std::cout<<std::endl;
    std::cout<<(*ptrArray+2);//from current memory address get me the 2nd 
    //element
    std::cout<<std::endl;
    
    ptrArray[1]=6;
    std::cout<<(arr[0]);//from current memory address add 0 
    std::cout<<std::endl;
    std::cout<<(arr[1]);//form current memory address get the next
    std::cout<<std::endl;
    std::cout<<(arr[2]);//from current memory address get me the 2nd 
    //element
     std::cout<<std::endl;
    std::cout<<ptrArray;

    return 0;
}