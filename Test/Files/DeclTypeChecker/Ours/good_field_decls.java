class Foo {
    public static void main(String[] args) {
        
    }
}

class Bar {
    int x;
    boolean y;
    
    public int bar() {
        return 3;
    }
    
    public boolean hasBar() {
        return false;
    }
}

class Baz {
    boolean y;
    Bar z;
    
    public int baz() {
        return 42;
    }
    
    public boolean hasBaz() {
        return true;
    }
}