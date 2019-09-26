from neat import node, identifiable
import numpy as np


class Connection(identifiable.Identifiable):

    __id = 0

    def __init__(self, in_node: node.Node, out_node: node.Node, status: bool = True):

        if in_node.get_id() == out_node.get_id():
            raise Exception('In and out node must be different')

        self.__in_node = in_node
        self.__out_node = out_node

        self.__status = status
        self.__weight = np.random.rand(1)

        Connection.__id += 1
        self.__current_id = Connection.__id

    def get_in_out_nodes(self) -> [node.Node, node.Node]:
        return self.__in_node, self.__out_node

    def get_status(self) -> bool:
        return self.__status

    def get_weight(self) -> float:
        return self.__weight

    def get_id(self) -> int:
        return self.__current_id

    @staticmethod
    def get_last_id() -> int:
        return Connection.__id
