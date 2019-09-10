import numbers


class Node:
    __count = 0

    def __init__(self, value=0):
        self.__value = value

        Node.__count += 1
        self.__current_id = Node.__count

    def get(self):
        return self.__value

    def set(self, value):
        if not isinstance(value, numbers.Number):
            return False

        self.__value = value
        return True

    def get_id(self):
        return self.__current_id

    @staticmethod
    def count():
        return Node.__count

