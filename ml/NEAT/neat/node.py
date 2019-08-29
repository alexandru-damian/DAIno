class Node:
    def __init__(self, value = 0):
        self.__value = value

    def get(self):
        return self.__value

    def set(self, value):
        self.__value = value
        return True
