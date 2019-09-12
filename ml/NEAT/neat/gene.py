from neat import node


class Gene:
    def __init__(self, in_node: node.Node, out_node: node.Node):

        if in_node.get_id() == out_node.get_id():
            raise Exception('In and out node must be different')

        self.__in_node = in_node
        self.__out_node = out_node

    def get_in_out_nodes(self):
        return self.__in_node, self.__out_node
