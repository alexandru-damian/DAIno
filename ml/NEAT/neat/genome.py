from neat import node, connection as conn


class Genome:

    __innovation = 0

    def __init__(self, first_node: node.Node, last_node: node.Node,
                 connection: conn.Connection):

        self.__innovation = Genome.__innovation
        Genome.__innovation += 1

        self.__first_node = first_node
        self.__last_node = last_node

        self.__connection = connection

    def get_connection(self) -> conn.Connection:
        return self.__connection

    def get_nodes(self) -> [node.Node, node.Node]:
        return self.__first_node, self.__last_node

    def get_innovation(self) -> int:
        return self.__innovation

