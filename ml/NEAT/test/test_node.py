import unittest
from neat import node


class DummyClass:
    pass


class TestNode(unittest.TestCase):

    def setUp(self):
        self.node = node.Node()

    def test_node_without_specified_value_must_be_zero(self):
        self.assertEqual(self.node.get(), 0)

    def test_node_can_set_a_numerical_value(self):
        self.assertTrue(self.node.set(7), "Integer value could not be set")
        self.assertEqual(self.node.get(), 7)

        self.assertTrue(self.node.set(10.343), "Float value could not be set")
        self.assertEqual(self.node.get(), 10.343)

        self.assertTrue(self.node.set(1 + 4j), "Complex value could not be set")
        self.assertEqual(self.node.get(), 1 + 4j)

    def test_node_cannot_set_a_non_numerical_value(self):
        self.assertFalse(self.node.set("The quick brown fox jumps over the lazy dog"))
        self.assertFalse(self.node.set(DummyClass()))

    def test_adding_new_node_should_not_have_same_id(self):
        dummy_node = node.Node()

        self.assertNotEqual(dummy_node.get_id(), self.node.get_id())
