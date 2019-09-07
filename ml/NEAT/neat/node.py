import numbers


class Node:
    __id = 0

    def __init__(self, value=0):
        self.__value = value
        self.__current_id = Node.__id

        Node.__id += 1

    def get(self):
        return self.__value

    def set(self, value):
        if not isinstance(value, numbers.Number):
            return False

        self.__value = value
        return True

    def get_id(self):
        return self.__current_id

