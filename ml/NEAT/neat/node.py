import numbers
from neat import gene
from enum import Enum


class Type(Enum):
    HIDDEN = 0
    IN = 1
    OUT = 2


class Node(gene.Gene):
    __id = 0
    __nodes = dict()

    def __init__(self, value: numbers.Number = 0, type_: Type = Type.HIDDEN):
        self.__value = value

        Node.__id += 1
        self.__current_id = Node.__id

        self.__type = type_

    def connect(self, connection_id, in_node_id) -> bool:
        if connection_id is None or in_node_id is None:
            return False

        self.__nodes[in_node_id] = connection_id
        return True

    def get(self) -> numbers.Number:
        return self.__value

    def set(self, value: numbers.Number) -> bool:
        if not isinstance(value, numbers.Number):
            return False

        self.__value = value
        return True

    def get_type(self) -> Type:
        return self.__type

    def get_id(self) -> int:
        return self.__current_id

    @staticmethod
    def get_last_id() -> int:
        return Node.__id
